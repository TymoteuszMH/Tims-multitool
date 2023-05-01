import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { note } from 'src/app/interfaces/note';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { NoteService } from 'src/app/services/api/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  /*
  @notes: get list of notes as note from interface
  @notesWithoutFilters: stores notes array
  @titleFilter: filter title
  */
  notes:note[] = [];
  notesWithoutFilters:note[] = [];
  titleFilter:string = "";

  constructor(private modalService: NgbModal,
              private noteService: NoteService,
              private spinner: NgxSpinnerService,
              private router: Router
  ){}

  ngOnInit(){
    this.getNotes();
  }

  /*
  @getNotes: getting user's notes
  @filter: filtring through notes to find title
  @goToDetails: going to note details
  @addNote: adding note and going to it
  @deleteNote: showing confirm modal, deletign note after submitting
  */

  getNotes(){
    this.spinner.show();
    this.noteService.getNotes().subscribe((res)=>{
      this.notes = res;
      this.notesWithoutFilters = res;
      this.spinner.hide();
    })
  }

  filter(){
    var titleFilter = this.titleFilter;

    this.notes = this.notesWithoutFilters.filter(function (el){
      return el.title.toString().toLowerCase().includes(
        titleFilter.toString().trim().toLowerCase()
      )
    })
  }

  goToDetails(id:number){
    this.router.navigate([ '/note-details', id]);
  }

  addNote(){
    var val = {title:'',
               content: ''
              }
    this.noteService.addNote(val).subscribe((res:any)=>{
      this.goToDetails(res.id);
    })
  }

  deleteNote(id:number){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.noteService.deleteNote(id).subscribe(()=>{
          this.getNotes();
          this.spinner.hide();
        });
      }
    });
  }
}
