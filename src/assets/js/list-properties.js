
function validateForm() {
    var listerName = document.getElementById("listerName").value;
    var listerEmail = document.getElementById("listerEmail").value;
    var listerCity = document.getElementById("propertyCity").value;
    var listerProfession = document.getElementById("listerDescription").value;
    var listerLocality = document.getElementById("propertyLocality").value;
    var listerMobileNumber = document.getElementById("listerMobileNumber").value;
    var propertyName = document.getElementById("propertyName").value;
    var terms = document.getElementById("terms").checked;

    // Validation for name: Check if it contains only letters and spaces
    var namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(listerName)) {
        alert("Name can only contain letters and spaces");
        return false;
    }

    //validation for listerProfession
    if (!namePattern.test(listerProfession)) {
        alert("Profession can only contain letters and spaces");
        return false;
    }

    //validation for PropertyName
    if (!namePattern.test(propertyName)) {
        alert("Property name can only contain letters and spaces");
        return false;
    }

    //validation for City
    if (!namePattern.test(listerCity)) {
        alert("City name can only contain letters and spaces");
        return false;
    }

    //Validation for Loacality
    if (!namePattern.test(listerLocality)) {
        alert("Locality name can only contain letters and spaces");
        return false;
    }

    // Validation for email: Check if it's a valid email address
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(listerEmail)) {
        alert("Please enter a valid email address");
        return false;
    }

    // Validation for mobile number: Check if it's a valid 10-digit number
    var mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(listerMobileNumber)) {
        alert("Please enter a valid 10-digit mobile number");
        return false;
    }

    // Check if the terms and conditions checkbox is checked
    if (!terms) {
        alert("Please agree to the Terms and Conditions");
        return false;
    }

    // If all validations pass, the form will be submitted
    return true;
}