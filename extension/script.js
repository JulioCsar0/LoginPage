const form = document.querySelector('form')
let bp = document.getElementById('bp')
let password = document.getElementById('password')

const moodle = () => {
    if (window.location.href !== "https://moodle.bra.ifsp.edu.br/my/") {

        window.location.href = "https://moodle.bra.ifsp.edu.br/my/"
    }
}

const Suap = () => {
    if (window.location.href !== "https://suap.ifsp.edu.br/accounts/login/") {

        window.location.href = "https://suap.ifsp.edu.br/accounts/login/"
    }
}


const putBP = (bp) => {
    setTimeout(() => {
        let atualBp = document.getElementById('id_username')
        atualBp.value = bp
    }, 0);
    
   
}

const putPassword = (password) => {
    setTimeout(() => {
        
        let atualPassword = document.getElementById('id_password')
        atualPassword.value = password  
    }, 0)
    
   
}

const clickSubmit = () => {
    setTimeout (() =>{

        const botao = document.querySelector(".submit-row input[type='submit']")
        if(botao){
            console.log("botao encontrado")
            botao.click()
        
        }else{
            console.log("burro")
        }
    }, 0)
    
}


form.addEventListener('submit', async (event)=>{
    
    event.preventDefault()

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    
    if (window.location.href !== "https://suap.ifsp.edu.br/accounts/login/"){

        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: Suap
        }) 
    }
    
    
     setTimeout(() => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: putBP,
            args:[bp.value], 
        })
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: putPassword,
            args:[password.value],
        
        })

        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: clickSubmit
        
        })
        setTimeout(() => {
            if (window.location.href !== "https://suap.ifsp.edu.br/"){
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    function: moodle
                })
            }
        },1000)
        
        
        
    }, 500)
    
    

    
    
})