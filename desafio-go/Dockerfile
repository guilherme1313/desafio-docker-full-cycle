FROM golang:1.16 as build

WORKDIR /app

COPY projeto-go /app

RUN CGO_ENABLED=0 GOOS=linux go build -o hello-world .

FROM scratch

COPY --from=build /app/hello-world /

CMD ["/hello-world"]
