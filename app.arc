@app
eusml-labeller-88d9

@aws
region ap-south-1

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

patient
  pk *String # PatientMRD