function analyzeReport() {
 const text = document.getElementById("reportInput").value;
 const lines = text.split("\n");
 const outputDiv = document.getElementById("output");

 let cardsHTML = "";

 lines.forEach(line => {
 if (line.includes("=")) {
  let [test, valueStr] = line.split("=");
      test = test.trim();
      const value = parseFloat(valueStr.trim());

      const result = checkTest(test, value);

      cardsHTML += `
        <div class="card">
          <h3>${test}</h3>
          <p>Value: ${valueStr.trim()}</p>
          <p>Status: <span class="${result.statusClass}">${result.status}</span></p>
          <p class="recommendation">Recommendation: ${result.recommendation}</p>
        </div>
      `;
    }
  });

  outputDiv.innerHTML = cardsHTML;
}

// Thresholds
function checkTest(test, value) {
  switch(test.toLowerCase()) {
    // Existing Tests
    case "platelet count":
      if (value < 150000) return {status: "Low", statusClass:"abnormal", recommendation: "Possible Dengue/Malaria risk → Consult doctor."};
      return {status: "Normal", statusClass:"normal", recommendation: "Platelets normal."};
    case "ns1 antigen":
      if (value > 0) return {status: "Positive", statusClass:"abnormal", recommendation: "Dengue detected → Doctor consult required."};
      return {status: "Negative", statusClass:"normal", recommendation: "No Dengue detected."};
    case "malaria parasite count":
      if (value > 0) return {status: "Positive", statusClass:"abnormal", recommendation: "Malaria detected → Immediate treatment required."};
      return {status: "Negative", statusClass:"normal", recommendation: "No Malaria detected."};
    case "widal o titer":
    case "widal h titer":
      if (value >= 160) return {status: "Positive", statusClass:"abnormal", recommendation: "Typhoid suspected → Doctor consult."};
      return {status: "Negative", statusClass:"normal", recommendation: "No Typhoid detected."};
    case "urine protein mg/dl":
      if (value > 0) return {status: "Positive", statusClass:"abnormal", recommendation: "Protein detected → Kidney stress possible."};
      return {status: "Negative", statusClass:"normal", recommendation: "Urine normal."};



    // 1. Diabetes (A1C)
    case "a1c":
    case "glycated hemoglobin":
      if (value >= 6.5) return {status: "Diabetes", statusClass:"abnormal", recommendation: "Diabetes range. Consult a doctor for management."};
      if (value >= 5.7) return {status: "Prediabetes", statusClass:"abnormal", recommendation: "Prediabetes range. Lifestyle changes recommended. Consult a doctor."};
      return {status: "Normal", statusClass:"normal", recommendation: "Blood sugar levels are normal. Maintain a healthy lifestyle."};

    // 2. High Blood Pressure (Hypertension)
    case "systolic":
    case "systolic pressure":
      if (value >= 180) return {status: "Hypertensive Crisis", statusClass:"abnormal", recommendation: "Urgent medical attention required. Please see a doctor immediately."};
      if (value >= 140) return {status: "Hypertension Stage 2", statusClass:"abnormal", recommendation: "Consult a doctor for treatment and lifestyle changes."};
      if (value >= 130) return {status: "Hypertension Stage 1", statusClass:"abnormal", recommendation: "Consult a doctor to discuss management options."};
      if (value >= 120) return {status: "Elevated", statusClass:"abnormal", recommendation: "Monitor blood pressure and consider lifestyle changes."};
      return {status: "Normal", statusClass:"normal", recommendation: "Systolic pressure is normal. Check diastolic value as well."};

    case "diastolic":
    case "diastolic pressure":
      if (value >= 120) return {status: "Hypertensive Crisis", statusClass:"abnormal", recommendation: "Urgent medical attention required. Please see a doctor immediately."};
      if (value >= 90) return {status: "Hypertension Stage 2", statusClass:"abnormal", recommendation: "Consult a doctor for treatment and lifestyle changes."};
      if (value >= 80) return {status: "Hypertension Stage 1", statusClass:"abnormal", recommendation: "Consult a doctor to discuss management options."};
      return {status: "Normal", statusClass:"normal", recommendation: "Diastolic pressure is normal. Check systolic value as well."};

    // 3. High Cholesterol
    case "total cholesterol":
      if (value >= 240) return {status: "High", statusClass:"abnormal", recommendation: "High cholesterol. Consult a doctor for diet and lifestyle advice."};
      if (value >= 200) return {status: "Borderline High", statusClass:"abnormal", recommendation: "Borderline high. Focus on a healthy diet and exercise."};
      return {status: "Normal", statusClass:"normal", recommendation: "Cholesterol is normal."};

    case "ldl cholesterol":
      if (value >= 160) return {status: "High", statusClass:"abnormal", recommendation: "High LDL ('bad') cholesterol. Consult a doctor for management."};
      if (value >= 130) return {status: "Borderline High", statusClass:"abnormal", recommendation: "Borderline high LDL. Improve diet and exercise."};
      return {status: "Optimal", statusClass:"normal", recommendation: "LDL ('bad') cholesterol is optimal."};

    case "hdl cholesterol":
      if (value < 40) return {status: "Low", statusClass:"abnormal", recommendation: "Low HDL ('good') cholesterol. Exercise and healthy fats can help."};
      if (value >= 60) return {status: "High", statusClass:"normal", recommendation: "High HDL ('good') cholesterol. This is a protective factor."};
      return {status: "Normal", statusClass:"normal", recommendation: "HDL ('good') cholesterol is normal."};
    
    case "triglycerides":
      if (value >= 200) return {status: "High", statusClass:"abnormal", recommendation: "High triglycerides. Reduce sugar, carbs, and alcohol intake."};
      if (value >= 150) return {status: "Borderline High", statusClass:"abnormal", recommendation: "Borderline high. Focus on a healthy diet."};
      return {status: "Normal", statusClass:"normal", recommendation: "Triglycerides are normal."};

    // 4. Anemia 
    case "hemoglobin":
      if (value < 12) return {status: "Low", statusClass:"abnormal", recommendation: "Low hemoglobin. Possible anemia. Consult a doctor. (Ranges vary by gender/age)"};
      return {status: "Normal", statusClass:"normal", recommendation: "Hemoglobin is normal."};
    
    case "hematocrit":
      if (value < 36) return {status: "Low", statusClass:"abnormal", recommendation: "Low hematocrit. Possible anemia. Consult a doctor. (Ranges vary by gender/age)"};
      return {status: "Normal", statusClass:"normal", recommendation: "Hematocrit is normal."};

    case "red blood cell count":
      if (value < 3.9) return {status: "Low", statusClass:"abnormal", recommendation: "Low RBC count. Possible anemia. Consult a doctor. (Ranges vary by gender/age)"};
      if (value > 5.8) return {status: "High", statusClass:"abnormal", recommendation: "High RBC count. Consult a doctor. (Ranges vary by gender/age)"};
      return {status: "Normal", statusClass:"normal", recommendation: "RBC count is normal."};

    // 5. Liver Disease
    case "alt":
    case "alanine transaminase":
      if (value > 56) return {status: "High", statusClass:"abnormal", recommendation: "High ALT. Can indicate liver damage. Consult a doctor."};
      return {status: "Normal", statusClass:"normal", recommendation: "ALT is normal."};

    case "ast":
    case "aspartate transaminase":
      if (value > 40) return {status: "High", statusClass:"abnormal", recommendation: "High AST. Can indicate liver damage. Consult a doctor."};
      return {status: "Normal", statusClass:"normal", recommendation: "AST is normal."};

    default:
      return {status: "Unknown", statusClass:"abnormal", recommendation: "Test not recognized."};
  }
}