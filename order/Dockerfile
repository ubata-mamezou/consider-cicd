# OpenJDKを基盤にしたイメージを使用
FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu
# FROM openjdk:21-slim-bullseye
# FROM gcr.io/distroless/java:21

# 作成したJARファイルをコンテナにコピー
COPY target/order-0.0.1.jar app.jar

# アプリケーションを実行するコマンド
ENTRYPOINT ["java", "-jar", "/app.jar"]

# コンテナのポートを公開
EXPOSE 8081
