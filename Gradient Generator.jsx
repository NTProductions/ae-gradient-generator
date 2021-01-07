// ae gradient generator

generateGradient(app.project.activeItem);

function generateGradient(comp) {
    app.beginUndoGroup("Gradient Generation");
    
    var gradientLayer = comp.layers.addSolid([1, 1, 1], "Gradient", comp.width, comp.height, 1, comp.duration);
    var gradientEffect = gradientLayer.Effects.addProperty("ADBE Ramp");
    
    var verticalBool = false;
    // if verticalBool is true, the gradient is top down, else left right
    // we will randomise this now with a simple 1 or 2 randomisation
    if(Math.floor(Math.random() * 2)+1 == 1) {
        verticalBool = false;
        } else {
        verticalBool = true;
            }
    
    var xRandom = Math.floor(Math.random() * comp.width);
    var yRandom = Math.floor(Math.random() * comp.height);
    
    // the xRandom and yRandom will be used only for the radial case, and we now want to clamp them so the random point will never be towards the edge of our layer (a sort of padding)
    if(xRandom < comp.width * .2) {
        xRandom = comp.width * .2;
        }
    if(yRandom < comp.height * .2) {
        yRandom = comp.height * .2;
        }
    if(xRandom > comp.width * .8) {
        xRandom = comp.width * .8;
        }
    if(yRandom > comp.height * .8) {
        yRandom = comp.height * .8;
        }
    
    // linear or radial ramp
    if(Math.floor(Math.random() * 2)+1 == 1) {
     // linear
     // set the position depending if its vertical or horizontal
     switch(verticalBool) {
         case false:
         gradientEffect.property(1).setValue([0, comp.height*.5]);
         gradientEffect.property(3).setValue([comp.width, comp.height*.5]);
         break;
         case true:
         gradientEffect.property(1).setValue([comp.width*.5, 0]);
         gradientEffect.property(3).setValue([comp.width*.5, comp.height]);
         break;
         }
        } else {
     // radial
     // we only need to randomise the position of the "Start of Ramp" with a radial type
     gradientEffect.property(5).setValue(2);
     gradientEffect.property(1).setValue([xRandom, yRandom]);
            }
        
     var rRandom = Math.random();
     var gRandom = Math.random();
     var bRandom =Math.random();
     
     // lastly colour randomisation, which is the same whether it is linear or radial
     gradientEffect.property(2).setValue([rRandom, gRandom, bRandom]);
     rRandom = Math.random();
     gRandom = Math.random();
     bRandom = Math.random();
     gradientEffect.property(4).setValue([rRandom, gRandom, bRandom]);
     
     // lastly lets move the gradient to the top so we can immediately see it no matter the situation
     gradientLayer.moveToBeginning();
     
    app.endUndoGroup();
    }