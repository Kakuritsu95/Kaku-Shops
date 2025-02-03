FROM openjdk:21-jdk
WORKDIR /app
COPY api/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
# EXPOSE 8080


