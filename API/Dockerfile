# Pobierz obraz Javy
FROM openjdk:17-alpine

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj plik jar do katalogu roboczego
COPY /target/Tmultitool-0.0.1-SNAPSHOT.jar /app

# Uruchom aplikację
CMD ["java", "-jar", "Tmultitool-0.0.1-SNAPSHOT.jar"]