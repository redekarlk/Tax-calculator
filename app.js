document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const submitBtn = document.getElementById("submitBtn");
    const errorIcons = document.querySelectorAll(".error-icon");
  
    // Show modal with tax calculation
    function showModal(remainingAmount) {
      const remainingResult = document.getElementById("remainingResult");
      remainingResult.textContent = Math.floor(remainingAmount);
      modal.style.display = "block";
    }
  
    // Close modal
    function closeModal() {
      modal.style.display = "none";
    }
  
    // Form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const grossIncome = parseFloat(document.getElementById("grossIncome").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
      const age = document.getElementById("age").value;
  
      // Validate form fields
      let isValid = true;
      if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions) || age === "") {
        isValid = false;
        errorIcons.forEach(icon => icon.style.display = "inline");
      } else {
        errorIcons.forEach(icon => icon.style.display = "none");
      }
  
      if (isValid) {
        let tax = 0;
        if (grossIncome + extraIncome - deductions <= 800000) {
          tax = 0;
        } else {
          const taxableIncome = grossIncome + extraIncome - deductions - 800000;
          if (age === "<40") {
            tax = taxableIncome * 0.3;
          } else if (age === "≥40 & <60") {
            tax = taxableIncome * 0.4;
          } else if (age === "≥60") {
            tax = taxableIncome * 0.1;
          }
        }
        const remainingAmount = (grossIncome + extraIncome - tax).toFixed(2);
        showModal(remainingAmount);
      }
    });
  
    // Close modal when close button is clicked
    closeBtn.addEventListener("click", closeModal);
  
    // Close modal when user clicks outside the modal
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
  
  