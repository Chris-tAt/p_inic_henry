const validationBreed = (breedVali) => {
const errors = {}; 
    if (!breedVali.name) {
      errors.name = "Por favor, ingrese el nombre del perro";
    } else if (!/^[A-Z][a-zA-Z0-9\s]+$/g.test(breedVali.name)) {
      errors.name = "Ingrese un nombre válido (primera letra en mayúscula - solo letras y números)";
    }
  
    if (!breedVali.height_min) {
      errors.height_min = "Por favor, indique la altura mínima";
    } else if (!/^[0-9]\d*(\.\d+)?$/.test(breedVali.height_min)) {
      errors.height_min = "Ingrese solo números enteros o decimales(ejem: 1  o 1.5)";
    } else if (breedVali.height_min < 1) {
      errors.height_min = "¡Eso es muy pequeño! ingresa una altura logica ;)";
    } else if (breedVali.height_min > 99) {
      errors.height_min = "¡Eso es muy alto! ingresa una altura logica ;)";
    }
  
    if (!breedVali.height_max) {
      errors.height_max = "Por favor, indique la altura máxima";
    } else if (!/^[0-9]\d*(\.\d+)?$/.test(breedVali.height_max)) {
      errors.height_max = "Ingrese solo números enteros o decimales (ejem: 1  o 1.5)";
    } else if (parseFloat(breedVali.height_max) <= parseFloat(breedVali.height_min)) {
      errors.height_max = "La altura máxima debe ser mayor que la altura mínima";
    } else if (breedVali.height_max > 170) {
      errors.height_max = "¡Eso es demasiado alto! ingresa una altura logica ;)";
    }
  
    if (!breedVali.weight_min) {
      errors.weight_min = "Por favor, indique el peso mínimo";
    } else if (!/^[0-9]\d*(\.\d+)?$/.test(breedVali.weight_min)) {
      errors.weight_min = "Ingrese solo números enteros o decimales (ejem: 1  o 1.5)";
    } else if (breedVali.weight_min < 1) {
      errors.weight_min = "¡Eso es muy ligero! ingresa un Pesos logico)";
    } else if (breedVali.weight_min > 100) {
      errors.weight_min = "¡Eso es muy pesado! ingresa un peso logico)";
    }
  
    if (!breedVali.weight_max) {
      errors.weight_max = "Por favor, indique el peso máximo";
    } else if (!/^[0-9]\d*(\.\d+)?$/.test(breedVali.weight_max)) {
      errors.weight_max = "Ingrese solo números enteros o decimales(ejem: 1  o 1.5)";
    } else if (parseFloat(breedVali.weight_max) <= parseFloat(breedVali.weight_min)) {
      errors.weight_max = "El peso máximo debe ser mayor que el peso mínimo";
    } else if (breedVali.weight_max > 130) {
      errors.weight_max = "¡Eso es muy pesado! ingresa un peso logico!";
    }
  
    if (!breedVali.life_span) {
      errors.life_span = "Por favor, indique la esperanza de vida";
    } else if (!/^[0-9]\d*(\.\d+)?$/.test(breedVali.life_span)) {
      errors.life_span = "Ingrese solo números enteros o decimales para la esperanza de vida";
    } else if (breedVali.life_span < 1) {
      errors.life_span = " La esperanza de vida debe ser mayor que 0";
    } else if (breedVali.life_span > 29) {
      errors.life_span = " la esperanza de vida es demasiado alta";
    }
  
    if (!breedVali.temperament.length) {
      errors.temperament = "Debe seleccionar al menos un temperamento";
    }
  
    return errors;
  };

  export default validationBreed;