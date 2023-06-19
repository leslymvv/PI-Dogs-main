export function validation(dogs,input){
    let errors ={};
    const exist = dogs && dogs.some(dog => dog.name.trim().toLowerCase() === input.name.trim().toLowerCase())

    if(!input.name){
        errors.name ="enter the name please";
    }else if(exist){
        errors.name ="the breed already exists, write another name";
    }else if(input.name.search(/^[a-zA-Z\s]*$/) ){
        errors.name ="No numbers or symbols are allowed in the name "
    }
    if(!input.minHeight){
        errors.minHeight ="enter the minimum height please";
    }else if( parseInt(input.minHeight) > parseInt(input.maxHeight)){
        errors.minHeight = "The minimum height cannot be greater than the maximum height";
    }else if(input.minHeight < 0){
        errors.minHeight = "Negative numbers are not allowed "
    }
    if(!input.maxHeight){
        errors.maxHeight ="enter the miximum height please";
    }else if( parseInt(input.maxHeight) < parseInt(input.minHeight) ){
        errors.maxHeight = "The miximum height cannot be minor than the minimum height";
    }
    if(!input.minWeight){
        errors.minWeight ="enter the minimum Weight please";
    }else if( parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.minWeight = "The minimum weight cannot be greater than the maximum weight";
    }
    if(!input.maxWeight){
        errors.maxWeight ="enter the miximum Weight please";
    }else if( parseInt(input.maxWeight) < parseInt(input.minWeight) ){
        errors.maxWeight = "The maximum height cannot be minor than the minimum height";
    }
    if(!input.minlife_span){
        errors.minlife_span ="enter the minimum years please";
    }else if( parseInt(input.minlife_span) > parseInt(input.maxlife_span)){
        errors.minlife_span = "The minimum years cannot be greater than the maximum years";
    }
    if(!input.maxlife_span){
        errors.maxlife_span ="enter the miximum years please";
    }else if( parseInt(input.maxlife_span) < parseInt(input.minlife_span) ){
        errors.maxlife_span = "The maximum years cannot be minor than the minimum years";
    }
    if(!/^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?\.(jpg|gif|png)$/.test(input.image)){
        errors.image_span ="enter the image url please";
    }
    
    return errors;
}