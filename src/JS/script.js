const inputs = document.querySelectorAll("input")
const spans = document.querySelectorAll(".inputs>span")
const times = document.querySelectorAll("section#bottom>p>span")
const button = document.querySelector("#btn_img")


const calcAge = () => {
    const valid = formValidation()
    
    if (valid) {
        const dateInTheFormat = dateValidate()
        
        if (dateInTheFormat) {
            const date = new Date()
            const currentYear = date.getFullYear()

            const ageInYear = currentYear - inputs[2].value
            const ageInMonth = ageInYear * 12
            const ageInDays = ageInYear * 365
            
            times[0].innerHTML = ageInYear
            times[1].innerHTML = ageInMonth
            times[2].innerHTML = ageInDays
        }
    }
}

const formValidation = () => {
    let validity = [!dayValidate(), !monthValidate(), !yearValidate()]
    
    return validity.every(input => input === true)
}

const dayValidate = () => {
    let error = true

    if (inputs[0].value.length === 0) {
        setError([inputs[0], "This field is required"])
    } else if(!isFinite(inputs[0].value)) {
        setError([inputs[0], "Only numbers"])
    } else if(inputs[0].value > 31 || inputs[0].value < 1) {
        setError([inputs[0], "Must be a valid day"])
    } else {
        setSuccess(inputs[0])
        error = false
    }

    return error
}

const monthValidate = () => {
    let error = true

    if (inputs[1].value.length === 0) {
        setError([inputs[1], "This field is required"])
    } else if(!isFinite(inputs[1].value)) {
        setError([inputs[1], "Only numbers"])
    } else if(inputs[1].value > 12) {
        setError([inputs[1], "Must be a valid month"])
    } else {
        setSuccess(inputs[1])
        error = false
    }

    return error
}

const yearValidate = () => {
    let error = true
    const date = new Date()
    const currentYear = date.getFullYear()

    if (inputs[2].value.length === 0) {
        setError([inputs[2], "This field is required"])
    } else if(!isFinite(inputs[2].value)) {
        setError([inputs[2], "Only numbers"])
    } else if(inputs[2].value > currentYear) {
        setError([inputs[2], "Must be in the past"])
    } else {
        setSuccess(inputs[2])
        error = false
    }

    return error
}

const dateValidate = () => {
    let valid = false
    
    const isMonthWithThirtyDays = [4, 6, 9, 11].some(month => month == inputs[1].value)
    const isFebruary = inputs[1].value == 2

    if (isMonthWithThirtyDays) {
        if (inputs[0].value > 30) {
            setError([inputs[0], "Must be a valid date"], [inputs[1], ""], [inputs[2], ""])
        } else {
            valid = true
        }
    } else if(!isMonthWithThirtyDays && isFebruary) {
        const eBissexto = testYear()

        if (eBissexto && inputs[0].value > 29) {
            setError([inputs[0], "Must be a valid date"], [inputs[1], ""], [inputs[2], ""])
        } else if(!eBissexto && inputs[0].value > 28) {
            setError([inputs[0], "Must be a valid date"], [inputs[1], ""], [inputs[2], ""])
        } else {
            valid = true
        }

    } else {
        if (inputs[0].value > 31) {
            setError([inputs[0], "Must be a valid date"], [inputs[1], ""], [inputs[2], ""])
        } else {
            valid = true
        }
    }
    
    return valid
}

const setError = (...barreds) => {
    for (const barred of barreds) {
        const spanError = barred[0].parentNode.querySelector("span")

        barred[0].classList.add("error")
        barred[0].parentNode.querySelector("label").classList.add("error")
        spanError.classList.add("error")
        spanError.innerHTML = barred[1] 
    }
    
}

const setSuccess = (input) => {
    const spanError = input.parentNode.querySelector("span")

    input.classList.remove("error")
    input.parentNode.querySelector("label").classList.remove("error")
    spanError.classList.remove("error")
    spanError.innerHTML = "" 
}

const testYear = () => {
    let isBissexto = false
    const fieldValue = inputs[2].value

    const isDivisibleForFour = fieldValue % 4 === 0
    const isDivisibleForOneHundred = fieldValue % 100 !== 0
    const isDivisibleForFourHundred = fieldValue % 400 === 0

    if (isDivisibleForFour || isDivisibleForFourHundred && !isDivisibleForOneHundred) {
        isBissexto = true
    }

    return isBissexto
}

button.addEventListener("click", calcAge)