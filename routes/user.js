

class User{

    #name
    #password

    constructor(name,password){
        this.#name = name
        this.#password = password
    }
    
    set Name(name){
        this.#name =  name
    }
    set Password(pass){
        this.#password =  pass
    }

    get Name(){
        return this.#name
    }
    get Password(){
        return this.#password
    }

}

const user = new User("shiro",568468)
user.Name = "Shishi"
console.log(user.Name)