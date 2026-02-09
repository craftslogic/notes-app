export default  function getUserInitials  (name)  {

    if(!name){
        return ""
    }

    const words = name.split(" ")

    let initials = ""

    for (let i=0; i< words.length ; i++){
        
            initials+= words[i][0]
        
    }

    return initials.toUpperCase()


    

};

