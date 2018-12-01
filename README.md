***********RESPUESTAS AL ENUNCIADO DEL LA PREGUNTA 1************* 

b) En base al enunciado a). ¿Qué diferencia existe entre la url base y la original?

////////////////****************************///////////////
La url base: La urlbase muestra en la que se montó una instancia del router es decir:

var serviceRouter = require('./routes/service');

////////////////****************************///////////////
La url original: Es muy parecida a urlbase;pero, conserva la URL de solicitud original, lo que le permite reescribir libremente para propósitos del router interno es decir:

app.use('/services', serviceRouter);
