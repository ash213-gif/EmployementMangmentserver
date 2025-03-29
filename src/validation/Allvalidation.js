exports.validname = (name) => {
  const validname = /^[A-Za-z ]+$/;
  return validname.test(name)
}

exports.validemail = (emailid) => {

  const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return validemail.test(emailid)
}


exports.validpassword = (password) => {

  const validpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return validpassword.test(password)

}



