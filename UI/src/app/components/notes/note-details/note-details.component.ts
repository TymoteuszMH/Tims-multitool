import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/api/note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent{
  /*
  @note: getting note
  */
  note: note = {id: 0, user: {username: "", password: ""}, title: "", content: "", createdAt: new Date, updatedAt: new Date}

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(){
    this.spinner.show();
    const tempID = this.route.snapshot.paramMap.get("id");
    this.getNote(tempID);
  }

  /*
  @getNote: getting note by id from url
  @save: saving note after writing without clicking any button
  */

  getNote(id:any){
    this.noteService.getNoteById(id).subscribe((res:any)=>{
      this.note = res;
      this.spinner.hide();
    })
  }
  
  save(res:note){
    var val = {title: res.title, 
               content: res.content, 
    }
    this.noteService.updateNote(res.id, val).subscribe(()=>{this.getNote(res.id);});
  }
}
