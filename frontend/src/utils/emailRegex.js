export default function emailValidation (email){

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(regex.test(email))

    return regex.test(email);

}


