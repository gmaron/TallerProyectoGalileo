/*---------Modulos externos necesarios---------*/
var console = require('console');
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend:true
}));
var Sequence =  require('sequence').Sequence;
var sequence = Sequence.create();

app.set('view options', { layout: false });
app.set('view engine', 'ejs');
var request = require("request");



/*-------Modulos del Node.js necesarios-------*/
var mraa = require("mraa");
var timers = require("timers");
var path = require('path');
var appDir = path.dirname(require.main.filename);



var emailAdmin = "";
var claveAdmin = "1234";


var portMusic = "8000";
var ipMusic = "192.168.0.12";
var dirMusic = "http://"+ipMusic+":"+portMusic+"/";

var cancionesPlayList0 = "";
var cancionesPlayList1 = "";
var cancionesPlayList2 = "";

var nombrePlaylist0 = "";
var nombrePlaylist1 = "";
var nombrePlaylist2 = "";

var dbNumPlay0 = "0";
var dbNumPlay1 = "2";
var dbNumPlay2 = "4";

var GLOBAL_modificoPerfil = 0;
var GLOBAL_usr_habitacion = "";
var GLOBAL_usr_pass = "";

app.get("/", function (req, res) {
  
    sequence.then(function(next){
        timers.setTimeout(function(){
            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                cancionesPlayList0 = body;
            });
             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                nombrePlaylist0 = body;
            });    
             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                cancionesPlayList1 = body;
            });   
            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                nombrePlaylist1 = body;
            }); 
            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                cancionesPlayList2 = body;
            });    
            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                nombrePlaylist2 = body;
            });    
            next();
        },100);
    })
    .then(function(next){
        timers.setTimeout(function(){
            res.render(appDir + '/inicio.ejs', {errorMessage: "", 
                                                errorMessageRegister: "",
                                                successMessageRegister:"",
                                                namePlaylist0:nombrePlaylist0,
                                                cancionesPlaylist0:cancionesPlayList0,
                                                indexPlaylist0:dbNumPlay0,
                                                namePlaylist1:nombrePlaylist1,
                                                cancionesPlaylist1:cancionesPlayList1,
                                                indexPlaylist1:dbNumPlay1,
                                                namePlaylist2:nombrePlaylist2,
                                                cancionesPlaylist2:cancionesPlayList2,
                                                indexPlaylist2:dbNumPlay2
                                               });    
        next();
        },100);
        
    });
});

app.post("/registro", function (req, res){
      var regEmail = req.body.email;
      recoveryUserByEmail(regEmail,function (err,content){
          if(err){
              console.log ("--->Error en registro<----\n"+err);
          }else{
                if (content !== null){
                sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/inicio.ejs', {errorMessage: "", 
                                                                errorMessageRegister: "Usuario ya registrado",
                                                                successMessageRegister:"",
                                                                namePlaylist0:nombrePlaylist0,
                                                                cancionesPlaylist0:cancionesPlayList0,
                                                                indexPlaylist0:dbNumPlay0,
                                                                namePlaylist1:nombrePlaylist1,
                                                                cancionesPlaylist1:cancionesPlayList1,
                                                                indexPlaylist1:dbNumPlay1,
                                                                namePlaylist2:nombrePlaylist2,
                                                                cancionesPlaylist2:cancionesPlayList2,
                                                                indexPlaylist2:dbNumPlay2
                                                               });    
                        next();
                        },100);

                    });  
            }else{
                recoveryAllUsers(function (err,content){
                    var passEncontrada = 0;
                    var regPass;
                    while (passEncontrada === 0){
                        regPass = passwordRandom();
                        for(var i = 0; i < content.length; i++)
                        {
                          if(content[i].password !== regPass)
                          {
                            passEncontrada = 1;
                          }
                        }
                    }
                    var regNombre = req.body.nom;
                    var regApellido = req.body.ape;
                    var regEmail = req.body.email;
                    var regDNI = req.body.dni;
                    var regTemp = req.body.temp;
                    var regLuz = req.body.luz;
                    var regPlaylist = req.body.playlist;
                    saveUserDataBase(regNombre,regApellido,regDNI,regEmail,regPass,regTemp,regLuz,regPlaylist);
                    sendEmail(regEmail,regNombre,regPass);
                    sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/inicio.ejs', {errorMessage: "", 
                                                                errorMessageRegister: "",
                                                                successMessageRegister:"Verifique su casilla para obtener su contrasena",
                                                                namePlaylist0:nombrePlaylist0,
                                                                cancionesPlaylist0:cancionesPlayList0,
                                                                indexPlaylist0:dbNumPlay0,
                                                                namePlaylist1:nombrePlaylist1,
                                                                cancionesPlaylist1:cancionesPlayList1,
                                                                indexPlaylist1:dbNumPlay1,
                                                                namePlaylist2:nombrePlaylist2,
                                                                cancionesPlaylist2:cancionesPlayList2,
                                                                indexPlaylist2:dbNumPlay2
                                                               });    
                        next();
                        },100);

                    });
                });
            }
          }
      });  
    });

app.post("/log", function(req, res) { 
    var checkCero = "";
    var checkUno = "";
    var checkDos = "";
    var inside = "0";
    recoveryUser(req.body.email,req.body.pass,function (err,content){
    if (err){
        console.log(err);
    }else{
        var dBemail;  
        var dBnombre;
        var dBapellido;
        var dBdni ;
        var dBtemp;
        var dBluz;
        var dBpass; 
        var dBplaylist;
        if (content !== null){            
            if (req.body.email !== emailAdmin){
                 dBemail = content[0].email;  
                 dBnombre = content[0].nombre;
                 dBapellido = content[0].apellido;
                 dBdni = content[0].dni;
                 dBtemp = content[0].temp;
                 dBluz = content[0].luz;
                 dBpass = content[0].password;
                 dBplaylist = content[0].idPlaylist;
                
                sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(dBplaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(dBplaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(dBplaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })  //checked
                    .then(function(next){
                          timers.setTimeout(function(){
                           recoveryAuditoriaNULL(function(err,content){
                                 if (err)
                                     console.log(err);
                                 else{
                                     if (content !== null){                                      
                                         if(dBemail == content[0].email){
                                             inside= "1";
                                          }
                                     }
                                 }
                              });
                            next();
                          },100); 
                    })  //inside
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilUsuario.ejs', {  userName:dBnombre,
                                                                         userSurname:dBapellido,
                                                                         userDNI:dBdni,
                                                                         userEmail:dBemail,
                                                                         userTemp: dBtemp,
                                                                         userLuz: dBluz,
                                                                         userPass: dBpass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    }); //Render del perfil usuario
                
                }else{
                     dBemail = content[0].email;  
                     dBnombre = content[0].nombre;
                     dBapellido = content[0].apellido;
                     dBdni = content[0].dni;
                     dBtemp = content[0].temp;
                     dBluz = content[0].luz;
                     dBpass = content[0].password; 
                     dBplaylist = content[0].idPlaylist;
                   sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })  //playlist
                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(dBplaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(dBplaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(dBplaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })         //checked
                    .then(function(next){
                          timers.setTimeout(function(){
                           recoveryAuditoriaNULL(function(err,content){
                                 if (err)
                                     console.log(err);
                                 else{
                                     if (content !== null){                                      
                                         if(dBemail == content[0].email){
                                             inside= "1";
                                          }
                                     }
                                 }
                              });
                            next();
                          },100);
                    })         //inside
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilAdministrador.ejs', {  userName:dBnombre,
                                                                         userSurname:dBapellido,
                                                                         userDNI:dBdni,
                                                                         userEmail:dBemail,
                                                                         userTemp: dBtemp,
                                                                         userLuz: dBluz,
                                                                         userPass: dBpass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });        //render perfil Administrador
            }
        }else{
            sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })  //playlist
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/inicio.ejs', {errorMessage: "Usuario/Contrasena invalida", 
                                                                errorMessageRegister: "",
                                                                successMessageRegister:"",
                                                                namePlaylist0:nombrePlaylist0,
                                                                cancionesPlaylist0:cancionesPlayList0,
                                                                indexPlaylist0:dbNumPlay0,
                                                                namePlaylist1:nombrePlaylist1,
                                                                cancionesPlaylist1:cancionesPlayList1,
                                                                indexPlaylist1:dbNumPlay1,
                                                                namePlaylist2:nombrePlaylist2,
                                                                cancionesPlaylist2:cancionesPlayList2,
                                                                indexPlaylist2:dbNumPlay2
                                                               });    
                        next();
                        },100);

                    }); //render del inicio
        }
    }
}); });

app.post("/historico",function(req,res){
    var inside="0";
    recoveryAllUsers(function(err,content){
        if (err)
            console.log(err);
        else{
            var dataObject = [];
            for (var i=0; i < content.length; i++){
                dataObject.push({ nombre:content[i].nombre,apellido:content[i].apellido,dni:content[i].dni,email:content[i].email});
            }
            recoveryAllAuditoria(function(err,content){
                if (err)
                    console.log(err);
                else{
                    var dataObjectAud = [];
                    var dataObjectAudHistorico = [];
                    var usuarioActual="No hay usuarios en la habitacion";
                    for (var i=0; i < content.length; i++){  
                        //Historicos
                        if(content[i].fechaSalida !== null){
                            dataObjectAudHistorico.push({email:content[i].email,fechaEntrada:content[i].fechaEntrada,
                              fechaSalida:content[i].fechaSalida});  
                        }else{
                            if (content[i].email == emailAdmin){
                               inside="1";
                            }
                            usuarioActual="Usuario Actual: "+content[i].email+" - "+"Fecha Entrada: "+content[i].fechaEntrada;
                        }
                    }                    
                    res.render(appDir + '/historicoAdministrador.ejs',{data:dataObject,
                                                                       dataAuditoriaHistorico:dataObjectAudHistorico,
                                                                       dataAuditoria:usuarioActual,
                                                                       inside:inside});
                }
            });            
        }
    });            
});

app.post("/perfil",function(req,res){
    var inside = "0";
    recoveryUser(emailAdmin,claveAdmin,function (err,content){
    if (err){
        console.log(err);
    }else{
        if (content !== null){                        
                var checkCero = "";
                var checkUno = "";
                var checkDos = "";
                var dBemail = content[0].email;  
                var dBnombre = content[0].nombre;
                var dBapellido = content[0].apellido;
                var dBdni = content[0].dni;
                var dBtemp = content[0].temp;
                var dBluz = content[0].luz;
                var dBpass = content[0].password;
                var dbPlaylist = content[0].idPlaylist;
                sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })  //playlist
                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(dbPlaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(dbPlaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(dbPlaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })         //checked
                    .then(function(next){
                          timers.setTimeout(function(){
                           recoveryAuditoriaNULL(function(err,content){
                                 if (err)
                                     console.log(err);
                                 else{
                                     if (content !== null){                                      
                                         if(dBemail == content[0].email){
                                             inside= "1";
                                          }
                                     }
                                 }
                              });
                            next();
                          },100);
                    })         //inside
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilAdministrador.ejs', {  userName:dBnombre,
                                                                         userSurname:dBapellido,
                                                                         userDNI:dBdni,
                                                                         userEmail:dBemail,
                                                                         userTemp: dBtemp,
                                                                         userLuz: dBluz,
                                                                         userPass: dBpass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });        //render de administrador
            
            }else{
                console.log("Error de acceso en base de datos - app.post(\"/perfil\"....)");
            
            }
    }
    });   
});
 
app.post("/modPerfil",function (req,res){
      var checkCero = "";
      var checkUno = "";
      var checkDos = "";
      var inside = "0";
      var regEmail = req.body.email;
      var regNombre = req.body.nom;
      var regApellido = req.body.ape;
      var regTemp = req.body.temp;
      var regLuz = req.body.luz;
      var regPass = req.body.pass; 
      var regDNI = req.body.userDNI;
      var regPlaylist = req.body.playlist;
      console.log ("Password del registro: "+regPass);
      console.log(regEmail+"|"+regNombre+"|"+regApellido+"|"+regTemp+"|"+regLuz+"|"+regPass+"|"+regDNI+"|"+regPlaylist+"|");
      recoveryUserByPass(regPass,function (err,content){         
          if (err){
             console.log ("----->Recovery User By Pass --- Modificar Perfil<------"+err);            
          }else{
            var dBid = content[0].id; //Como recupero por clave, siempre hace referencia al usuario que esta modificando el perfil
            var dBplaylist = content[0].idPlaylist;
            var dBemail = content[0].email;
            //Si es el administrador
            if (regPass === claveAdmin){
                if (regEmail === dBemail){ //Quiere decir que el administrador no cambio el email      
                    updateUserDataBase(regNombre,regApellido,regEmail,regTemp,regLuz,dBid,regPlaylist);
                    //es para saber si es el usuario registrado
                    if (GLOBAL_usr_habitacion === regEmail)
                        GLOBAL_modificoPerfil = 1;
                     sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });
                             request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                             request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });   
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            }); 
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })  //playlist
                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })         //checked
                    .then(function(next){
                          timers.setTimeout(function(){
                           recoveryAuditoriaNULL(function(err,content){
                                 if (err)
                                     console.log(err);
                                 else{
                                     if (content !== null){                                      
                                         if(regEmail == content[0].email){
                                             inside= "1";
                                             if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                             }
                                          }
                                     }
                                 }
                              });
                            next();
                          },100);
                    })         //inside
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilAdministrador.ejs', {  userName:regNombre,
                                                                         userSurname:regApellido,
                                                                         userDNI:regDNI,
                                                                         userEmail:regEmail,
                                                                         userTemp: regTemp,
                                                                         userLuz: regLuz,
                                                                         userPass: regPass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });        //Render de administrador 
                }
                else{
                    //El administrador cambio el email
                    recoveryUserByEmail(regEmail,function(err,contentEmail){
                        if (err){
                            console.log ("----->Recovery User By Email --- Modificar Perfil<------"+err);            
                        }else{
                            if (contentEmail === null){ // no hay nadie con ese email
                                updateUserDataBase(regNombre,regApellido,regEmail,regTemp,regLuz,dBid,regPlaylist);
                                //Usuario registrado y como cambio el mail
                                //se le asigna el nuevo email
                                if (GLOBAL_usr_habitacion === dBemail){
                                    GLOBAL_modificoPerfil = 1;
                                     GLOBAL_usr_habitacion = regEmail;
                                 }
                                sequence.then(function(next){
                                timers.setTimeout(function(){
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        cancionesPlayList0 = body;
                                    });
                                     request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        nombrePlaylist0 = body;
                                    });    
                                     request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        cancionesPlayList1 = body;
                                    });   
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        nombrePlaylist1 = body;
                                    }); 
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        cancionesPlayList2 = body;
                                    });    
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        nombrePlaylist2 = body;
                                    });    
                                    next();
                                },100);
                            })  //playlist
                                    .then(function(next){
                                        timers.setTimeout(function(){
                                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                                checkCero = "checked="+true;
                                            }else{
                                                if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                                    checkUno =  "checked="+true;
                                                }else{
                                                    if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                                        checkDos =  "checked="+true;
                                                }
                                            }
                                            next();
                                        },100);
 })      //checked
                                    .then(function(next){
                                          timers.setTimeout(function(){
                                           recoveryAuditoriaNULL(function(err,content){
                                                 if (err)
                                                    console.log ("----->Recovery Auditoria NULL --- Modificar Perfil<------"+err);            
                                                 else{
                                                     if (content !== null){                                      
                                                         if(regEmail == content[0].email){
                                                             inside= "1";
                                                             if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                                                }
                                                          }
                                                     }
                                                 }
                                              });
                                            next();
                                          },100);
                                    })      //inside
                                    .then(function(next){
                                        timers.setTimeout(function(){
                                            res.render(appDir + '/perfilAdministrador.ejs', {  userName:regNombre,
                                                                                         userSurname:regApellido,
                                                                                         userDNI:regDNI,
                                                                                         userEmail:regEmail,
                                                                                         userTemp: regTemp,
                                                                                         userLuz: regLuz,
                                                                                         userPass: regPass,
                                                                                         errorMessageEmail:"",
                                                                                    namePlaylist0:nombrePlaylist0,
                                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                                    indexPlaylist0:dbNumPlay0,
                                                                                    namePlaylist1:nombrePlaylist1,
                                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                                    indexPlaylist1:dbNumPlay1,
                                                                                    namePlaylist2:nombrePlaylist2,
                                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                                    indexPlaylist2:dbNumPlay2,
                                                                                    checkCero:checkCero,
                                                                                    checkUno:checkUno,
                                                                                    checkDos:checkDos,
                                                                                    inside:inside
                                                                               });    
                                        next();
                                        },100);

 });     //render administrador
                
                            }
                            else{ //NO CAMBIO NINGUN CAMPO
                                dBemail = content[0].email;  
                                var dBnombre = content[0].nombre;
                                var dBapellido = content[0].apellido;
                                var dBtemp = content[0].temp;
                                var dBluz = content[0].luz;

                                
                                sequence.then(function(next){
                                timers.setTimeout(function(){
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        cancionesPlayList0 = body;
                                    });
                                     request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        nombrePlaylist0 = body;
                                    });    
                                     request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        cancionesPlayList1 = body;
                                    });   
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        nombrePlaylist1 = body;
                                    }); 
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        cancionesPlayList2 = body;
                                    });    
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        nombrePlaylist2 = body;
                                    });    
                                    next();
                                },100);
                            })  //playlist
                                .then(function(next){
                                timers.setTimeout(function(){
                                    if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                        checkCero = "checked="+true;
                                    }else{
                                        if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                            checkUno =  "checked="+true;
                                        }else{
                                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                                checkDos =  "checked="+true;
                                        }
                                    }
                                    next();
                                },100);
                            })          //checked
                                .then(function(next){
                                  timers.setTimeout(function(){
                                   recoveryAuditoriaNULL(function(err,content){
                                         if (err)
                                             console.log(err);
                                         else{
                                             if (content !== null){                                      
                                                 if(dBemail == content[0].email){
                                                     inside= "1";
                                                     if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                             }
                                                  }
                                             }
                                         }
                                      });
                                    next();
                                  },100);
                            })          //inside
                                .then(function(next){
                                timers.setTimeout(function(){
                                    res.render(appDir + '/perfilAdministrador.ejs', {  userName:dBnombre,
                                                                                 userSurname:dBapellido,
                                                                                 userDNI:regDNI,
                                                                                 userEmail:dBemail,
                                                                                 userTemp: dBtemp,
                                                                                 userLuz: dBluz,
                                                                                 userPass: regPass,
                                                                                 errorMessageEmail:"El email ya se encuentra registrado",
                                                                            namePlaylist0:nombrePlaylist0,
                                                                            cancionesPlaylist0:cancionesPlayList0,
                                                                            indexPlaylist0:dbNumPlay0,
                                                                            namePlaylist1:nombrePlaylist1,
                                                                            cancionesPlaylist1:cancionesPlayList1,
                                                                            indexPlaylist1:dbNumPlay1,
                                                                            namePlaylist2:nombrePlaylist2,
                                                                            cancionesPlaylist2:cancionesPlayList2,
                                                                            indexPlaylist2:dbNumPlay2,
                                                                            checkCero:checkCero,
                                                                            checkUno:checkUno,
                                                                            checkDos:checkDos   
                                                                       });    
                                next();
                                },100);

                            });         //render administrador
                            }
                        }                   
                    });
                }
            }
            //Es un usuario
            else{
                if (regEmail === dBemail){ //Quiere decir que el usuario no cambio el email
                    updateUserDataBase(regNombre,regApellido,regEmail,regTemp,regLuz,dBid,regPlaylist);   
                     //es para saber si es el usuario registrado
                    if (GLOBAL_usr_habitacion === regEmail)
                        GLOBAL_modificoPerfil = 1;                        
                    sequence.then(function(next){
                                timers.setTimeout(function(){
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        cancionesPlayList0 = body;
                                    });
                                     request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        nombrePlaylist0 = body;
                                    });    
                                     request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        cancionesPlayList1 = body;
                                    });   
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        nombrePlaylist1 = body;
                                    }); 
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        cancionesPlayList2 = body;
                                    });    
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        nombrePlaylist2 = body;
                                    });    
                                    next();
                                },100);
                            })  //playlist
                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })          //checked
                    .then(function(next){
                                  timers.setTimeout(function(){
                                   recoveryAuditoriaNULL(function(err,content){
                                         if (err)
                                             console.log(err);
                                         else{
                                             if (content !== null){                                      
                                                 if(regEmail == content[0].email){
                                                     inside= "1";
                                                     if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                             }
                                                  }
                                             }
                                         }
                                      });
                                    next();
                                  },100);
                            })          //inside
                    .then(function(next){
                        timers.setTimeout(function(){
                            //es para saber si es el usuario registrado
                            if (GLOBAL_usr_habitacion === regEmail)
                                GLOBAL_modificoPerfil = 1;
                            res.render(appDir + '/perfilUsuario.ejs', {  userName:regNombre,
                                                                         userSurname:regApellido,
                                                                         userDNI:regDNI,
                                                                         userEmail:regEmail,
                                                                         userTemp: regTemp,
                                                                         userLuz: regLuz,
                                                                         userPass: regPass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });         //render del usuario
                    
                    
                }
                else{
                    console.log("1013 - >email a verificar: "+regEmail);
                    recoveryUserByEmail(regEmail,function(err,contentEmail){
                        if (err){
                            console.log(err);
                        }else{
                            if (contentEmail === null){ // no hay nadie con ese email
                                console.log("1019 -> no hay nadie con el email: "+regEmail);
                                //es para saber si es el usuario registrado
                                if (GLOBAL_usr_habitacion === dBemail){
                                    GLOBAL_modificoPerfil = 1;
                                    GLOBAL_usr_habitacion = regEmail;
                                }
                                updateUserDataBase(regNombre,regApellido,regEmail,regTemp,regLuz,dBid,regPlaylist);
                                sequence.then(function(next){
                                timers.setTimeout(function(){
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        cancionesPlayList0 = body;
                                    });
                                     request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        nombrePlaylist0 = body;
                                    });    
                                     request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        cancionesPlayList1 = body;
                                    });   
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        nombrePlaylist1 = body;
                                    }); 
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        cancionesPlayList2 = body;
                                    });    
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        nombrePlaylist2 = body;
                                    });    
                                    next();
                                },100);
                            })      //playlist
                                    .then(function(next){
                        timers.setTimeout(function(){
                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                checkCero = "checked="+true;
                            }else{
                                if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                    checkUno =  "checked="+true;
                                }else{
                                    if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                        checkDos =  "checked="+true;
                                }
                            }
                            next();
                        },100);
                    })          //checked
                                    .then(function(next){
                                  timers.setTimeout(function(){
                                   recoveryAuditoriaNULL(function(err,content){
                                         if (err)
                                             console.log(err);
                                         else{
                                             if (content !== null){                                      
                                                 if(regEmail == content[0].email){
                                                     inside= "1";
                                                     if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                             }
                                                  }
                                             }
                                         }
                                      });
                                    next();
                                  },100);
                            })          //inside
                                    .then(function(next){
                                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilUsuario.ejs', {  userName:regNombre,
                                                                         userSurname:regApellido,
                                                                         userDNI:regDNI,
                                                                         userEmail:regEmail,
                                                                         userTemp: regTemp,
                                                                         userLuz: regLuz,
                                                                         userPass: regPass,
                                                                         errorMessageEmail:"",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });         //render del usuario
                            }
                            else{ //NO CAMBIO NINGUN CAMPO
                                console.log("1112 -> RegEmail: "+regEmail);
                                dBemail = content[0].email;  
                                var dBnombre = content[0].nombre;
                                var dBapellido = content[0].apellido;
                                var dBtemp = content[0].temp;
                                var dBluz = content[0].luz;
                                
                                sequence.then(function(next){
                                timers.setTimeout(function(){
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        cancionesPlayList0 = body;
                                    });
                                     request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                        nombrePlaylist0 = body;
                                    });    
                                     request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        cancionesPlayList1 = body;
                                    });   
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                        nombrePlaylist1 = body;
                                    }); 
                                    request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        cancionesPlayList2 = body;
                                    });    
                                    request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                        nombrePlaylist2 = body;
                                    });    
                                    next();
                                },100);
                            })      //playlist
                                .then(function(next){
                                    timers.setTimeout(function(){
                                        if (parseInt(regPlaylist,10) == parseInt(dbNumPlay0,10)){
                                            checkCero = "checked="+true;
                                        }else{
                                            if (parseInt(regPlaylist,10) == parseInt(dbNumPlay1,10)){
                                                checkUno =  "checked="+true;
                                            }else{
                                                if (parseInt(regPlaylist,10) == parseInt(dbNumPlay2,10))
                                                    checkDos =  "checked="+true;
                                            }
                                        }
                                        next();
                                        },100);
                                    })              //checked
                                .then(function(next){
                                  timers.setTimeout(function(){
                                   recoveryAuditoriaNULL(function(err,content){
                                         if (err)
                                             console.log(err);
                                         else{
                                             if (content !== null){                                      
                                                 if(dBemail == content[0].email){
                                                     inside= "1";
                                                     if (dBplaylist != regPlaylist){
                                                 request(dirMusic+"changePlaylist?num="+regPlaylist, function(error, response, body) {});
                                             }
                                                  }
                                             }
                                         }
                                      });
                                    next();
                                  },100);
                            })              //inside
                                .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/perfilUsuario.ejs', {  userName:dBnombre,
                                                                         userSurname:dBapellido,
                                                                         userDNI:regDNI,
                                                                         userEmail:dBemail,
                                                                         userTemp: dBtemp,
                                                                         userLuz: dBluz,
                                                                         userPass: regPass,
                                                                         errorMessageEmail:"El email ya se encuentra registrado",
                                                                    namePlaylist0:nombrePlaylist0,
                                                                    cancionesPlaylist0:cancionesPlayList0,
                                                                    indexPlaylist0:dbNumPlay0,
                                                                    namePlaylist1:nombrePlaylist1,
                                                                    cancionesPlaylist1:cancionesPlayList1,
                                                                    indexPlaylist1:dbNumPlay1,
                                                                    namePlaylist2:nombrePlaylist2,
                                                                    cancionesPlaylist2:cancionesPlayList2,
                                                                    indexPlaylist2:dbNumPlay2,
                                                                    checkCero:checkCero,
                                                                    checkUno:checkUno,
                                                                    checkDos:checkDos,
                                                                    inside:inside
                                                               });    
                        next();
                        },100);

                    });             //render del usuario
                                
                            }                        
                        }                
                    });                                
                } 
            }
          }          
      });   
});

app.post("/cerrarSesion",function (req,res){
        sequence.then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                cancionesPlayList0 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                           request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay0, function(error, response, body) {
                                nombrePlaylist0 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                cancionesPlayList1 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                           request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay1, function(error, response, body) {
                                nombrePlaylist1 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            request(dirMusic+"damePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                cancionesPlayList2 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                           request(dirMusic+"dameNombrePlaylist?num="+dbNumPlay2, function(error, response, body) {
                                nombrePlaylist2 = body;
                            });    
                            next();
                        },100);
                    })
                    .then(function(next){
                        timers.setTimeout(function(){
                            res.render(appDir + '/inicio.ejs', {errorMessage: "", 
                                                                errorMessageRegister: "",
                                                                successMessageRegister:"",
                                                                namePlaylist0:nombrePlaylist0,
                                                                cancionesPlaylist0:cancionesPlayList0,
                                                                indexPlaylist0:dbNumPlay0,
                                                                namePlaylist1:nombrePlaylist1,
                                                                cancionesPlaylist1:cancionesPlayList1,
                                                                indexPlaylist1:dbNumPlay1,
                                                                namePlaylist2:nombrePlaylist2,
                                                                cancionesPlaylist2:cancionesPlayList2,
                                                                indexPlaylist2:dbNumPlay2
                                                               });    
                        next();
                        },100);

                    });
});

app.post("/musicSiguiente",function(req,res){
    var reqPassCompleta = String(req.body.pass);
    var reqPass = reqPassCompleta.substring(5);
    if (GLOBAL_usr_pass == reqPass){
        request(dirMusic+"changeMusicNext", function(error, response, body) {
            });
    }else{
        console.log("Persona no autorizada");
    }
     res.end();
});

app.post("/musicAnterior",function(req,res){
    var reqPassCompleta = String(req.body.pass);
    var reqPass = reqPassCompleta.substring(5);
    if (GLOBAL_usr_pass == reqPass){
       request(dirMusic+"changeMusicBack", function(error, response, body) {
       });
    }else{
        console.log("Persona no autorizada");
    }
    res.end();
});

app.post("/musicPause",function(req,res){                        
   var reqPassCompleta = String(req.body.pass);
    var reqPass = reqPassCompleta.substring(5);
    if (GLOBAL_usr_pass == reqPass){
       request(dirMusic+"pauseMusic", function(error, response, body) {
                    });
    }else{
        console.log("Persona no autorizada");
    }
    res.end();
});

app.post("/resumeMusic",function(req,res){
    var reqPassCompleta = String(req.body.pass);
    var reqPass = reqPassCompleta.substring(5);
    if (GLOBAL_usr_pass == reqPass){
       request(dirMusic+"resumeMusic", function(error, response, body) {
                    });
    }else{
        console.log("Persona no autorizada");
    }
    
    res.end();
});

/*---------------------------Variables y funciones para la Base de Datos--------------*/


var ipDataBase = '192.168.0.12';    // ip de la base de datos
var usrDataBase = 'milton';         // nombre de usuario
var passDataBase = 'milton';        // contrasena
var nameDataBase = 'tp2';           // nombre de la base de datos


/*
*   function: saveUserDataBase()
*       ---> genera la conexion y guarda un usuario en la base de datos
*   Parametros       
*		--> nombre: nombre del usuario
*		--> apellido: apellido del usuario
*		--> dni: dni del usuario
*		--> email: email del usuario
*		--> pass: contrasena del usuario
*		--> temp: temperatura elegida por el usuario
*		--> luz: porcentaje de luz elegido por el usuario
*       --> playlist: playlist elegida por el usuario
*/

function saveUserDataBase(nombre,apellido,dni,email,pass,temp,luz,playlist){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({      
      host     : ipDataBase,
      user     : usrDataBase,      
      password : passDataBase,
      database : nameDataBase
        
    });
    connection.connect();
    
    var valuesInsert = {nombre: nombre, apellido: apellido, dni: dni, email: email, password: pass, temp:temp, luz:luz, idPlaylist:playlist};
    var query = connection.query('INSERT INTO usuario SET ?', valuesInsert, function(err, result) {
        if (err)
            console.log(err);
    });

    connection.end();
}


/*
*   function: updateUserDataBase()
*       ---> genera la conexion y modifica los datos de un usuario en la base de datos
*   Parametros       
*		--> nombre: nombre del usuario
*		--> apellido: apellido del usuario
*		--> email: email del usuario
*		--> temp: temperatura elegida por el usuario
*		--> luz: porcentaje de luz elegido por el usuario
*       --> id: id del usuario a modificar
*       --> playlist: playlist elegida por el usuario
*/
function updateUserDataBase(nombre,apellido,email,temp,luz,id,playlist){
      var mysql      = require('mysql');
      var connection = mysql.createConnection({      
      host     : ipDataBase,
      user     : usrDataBase,      
      password : passDataBase,
      database : nameDataBase
        
    });
    connection.connect();

    var valuesUpdate = {nombre: nombre, apellido: apellido, email: email, temp:temp, luz:luz,idPlaylist:playlist};
    var querySentence = 'UPDATE usuario SET ? WHERE id='+id+'';
    var query = connection.query(querySentence,valuesUpdate, function(err, result) {
        if (err){
            console.log(err);
        }
    });
    connection.end();
}


/*
*   function: recoveryAllUser()
*       ---> genera la conexion y retorna todos los usuarios de la BD     
*   Retorno
*       --> filas con datos de usuarios
*       --> null si no hay ningun usuario
*
*/
function recoveryAllUsers(callback){
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();

    var query = 'SELECT * FROM usuario u';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
        
        //se realiza la consulta
        //correspondiente
        
        connection.end();
        
    });

    
}

/*
*   function: recoveryUser()
*       ---> genera la conexion y consulta si un usuario y su contrasena se encuentran
*            en la base de datos     
*   Parametros:       
*       --> email: email del usuario
*       --> pass: contrasena
*   Retorno
*       --> fila con datos del usuario si existe
*       --> null si no existe
*
*/
function recoveryUser(email,pass,callback){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();

    var query = 'SELECT * FROM usuario u WHERE (u.email="'+email+'" and u.password="'+pass+'")';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
    });

            connection.end();

    
}

/*
*   function: recoveryUserByEmail()
*       ---> genera la conexion y consulta si un usuario se encuentran
*            en la base de datos     
*   Parametros:       
*       --> email: email del usuario
*   Retorno
*       --> fila con datos del usuario si existe
*       --> null si no existe
*
*/
function recoveryUserByEmail (email,callback){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();

    var query = 'SELECT * FROM usuario u WHERE u.email="'+email+'"';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
        connection.end();
    });
}

function recoveryUserByPass (pass,callback){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();

    var query = 'SELECT * FROM usuario u WHERE u.password="'+pass+'"';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
        connection.end();
    });
}

function fechaHoy(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //Enero es el mes 0
    var yy = hoy.getFullYear();
    
    return dd+"/"+mm+"/"+yy;

}

/*
*
*   function: passwordRandom()
*       ---> genera una contrasena de ocho (8) numeros aleatorios
*
*/

function passwordRandom(){
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*
*
*
*
*
*/

function saveAuditoriaDataBase (email){
    
    var fechaEntrada = fechaHoyConHora();
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();
    
    
    var valuesInsert = {fechaEntrada: fechaEntrada, email: email};
    var query = connection.query('INSERT INTO auditoria SET ?', valuesInsert, function(err, result) {
        if (err)
            console.log(err);
    });

    connection.end();
    
}

function recoveryAuditoriaNULL(callback){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();
    
     var query = 'SELECT * FROM auditoria a where fechaSalida IS NULL';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
        connection.end();
    });
    
}

function recoveryAllAuditoria (callback){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();

    var query = 'SELECT * FROM auditoria a';
    
    var resQuery = connection.query(query,function(err, rows, fields) {
          if (!err){
              if (rows.length > 0)
                return callback(null, rows);
              else
                return callback (null,null);
          }else{
              return callback (err,null);
          }
        connection.end();
    });

}

function updateAuditoriaDataBase(email){

    var fechaSalida = fechaHoyConHora();
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : ipDataBase,
      user     : usrDataBase,
      password : passDataBase,
      database : nameDataBase
    });
    connection.connect();
    var valuesInsert = {fechaSalida: fechaSalida};
    var query = connection.query('UPDATE auditoria a SET ? WHERE (a.fechaSalida IS NULL)&&(a.email="'+email+'");', valuesInsert, function(err, result) {
        if (err)
            console.log(err);
        
    });
    
    connection.end();  
}

/*---------------------------Variables y funciones para manipular Emails--------------*/

var email   = require("emailjs");
var serverEmail  = email.server.connect({
   user:    "ppsgalileo@gmail.com", 
   password:"ingenieriaencomputacion", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

/*
*   function: sendEmail ()
*       ---> envia un mail con texto plano al usuario con su respectiva contrasena
*   Parametros:
*       ---> email: direccion para enviar el mail. Formato: direccion@servidor.com
*       ---> nombre: nombre del destinario
*       ---> pass: contrasena para el destinatario
*/
function sendEmail(email,nombre,pass){    
    serverEmail.send({
       text:    "Sr/a. "+nombre+" \n \nSu clave de acceso es: "+pass+"\n \nSaludos,\n \nGalileo", 
       from:    "Galileo <ppsgalileo@gmail.com>", 
       to:      nombre+" "+email,
       subject: "Clave de acceso - Galileo"
    }, function(err, message) { if (err!==null) console.log(err); });
}

/*
*
*   getPassword()
*       --> obtiene la contrasena ingresada por el usuario
*   Parametros:
*       --> passConEnter: es la contrasena leida desde el archivo con el
*           formato -> 'contrasenaConNumero'Enter
*   Retorno:
*       --> pass: la contrsena ingresada por el usuario
*/
function getPassword(passConEnter){
    var pass = '';
    var i = 0;
    var passSplit = passConEnter.split('');    
    //por si el usuario solo apreto Enter o por las dudas
    if (passSplit.length > 0){
        //la E es de Enter
        while (passSplit[i] !== 'E'){
            if(parseInt(passSplit[i],10) >= 0 ){
                pass += passSplit[i];
            }
            i++;
        }
    }
    return pass;
}


/*
*
*   Ejecucion del programa que lee los eventos del teclado
*   Codigo fuente: teclado.c
*   Ejecutable: teclado
*   ----> Fijarse el parametro en el linux de la placa antes de correr el programa
*/
var exec = require('child_process').exec;
var child;
var evento = "/dev/input/event2";
var gcc = "gcc -o teclado teclado.c";
var perm = "chmod 777 teclado";
var ejecutarTeclas = "cd "+appDir+"; "+gcc+";"+perm+";  ./teclado "+evento;
child = exec(ejecutarTeclas, function (error, stdout, stderr) {
  console.log('stdout: ' + stdout); 
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

function fechaHoyConHora(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //Enero es el mes 0
    var yy = hoy.getFullYear().toString();
    var hh = hoy.getHours();
    var min = hoy.getMinutes();
    if (parseInt(min,10) < 10){
        min = '0'+min;
    }
    if (parseInt(dd,10) < 10){
        dd = '0'+dd;
    }
    if (parseInt(mm,10)<10){
        mm = '0'+mm;
    }
    var yy_2_digitos = yy[2]+yy[3];
    return hh+":"+min+" - "+dd+"/"+mm+"/"+yy_2_digitos;
}


var lcd = require("jsupm_i2clcd");
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
var sleep = require("sleep");
var puedoEscribir = 1;

function mensajeLCDconDelay (msj,msj2){
    puedoEscribir = 0;
    writeLCD(msj,0,0);
    writeLCD(msj2,1,0);
    sleep.sleep(2);
    puedoEscribir = 1;
}

function writeLCD (dato,fil,col){
    display.setCursor(fil,col);
    display.write(dato);
    
}

function cleanLCD(){
    writeLCD("                ",0,0);
    writeLCD("                ",1,0);
}


/*
*   Programa principal
*       --> cada 1 segundo
*       --> Lee el archivo teclas.txt
*       --> Corrobora que el usuario haya apretado el Enter
*           --> si lo apreto quiere decir que hay una nueva contrasena
*           --> se fija si la contrasena pertenece a un usuario 
*               --> si pertenece, reconoce al usuario
*               --> sino, informa que el usuario no existe
*/

var fs = require('fs');
var hayUnoAdentro = 0;
var intervalSensores;

//pin 6 para encender el Cooler
var pinCooler = new mraa.Gpio(6); 
pinCooler.dir(mraa.DIR_OUT);

var abierto = 1;
var cerrado = 0;
pinCooler.write(abierto);

// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the relay switch object using GPIO pin 0
var relayCalefaccion = new groveSensor.GroveRelay(4);
relayCalefaccion.off();

var pwm = new mraa.Pwm(3);

pwm.enable(true);
pwm.write(0.0);


var msj_lcd = "Libre";
var data_sin_espacio;

function main(){
    
  timers.setInterval(function(){
    fs.readFile(appDir+'/teclas.txt', 'utf8', function (err,data) {   
        if (err) {
            console.log("Error lectura de archivos -> Linea 1864\n"+err);
        }
        else{
    
        data_sin_espacio = data.replace(" ","");
        if (data_sin_espacio.search("Enter") > 0){

                var pass = getPassword(data_sin_espacio);
                fs.writeFile(appDir+'/teclas.txt','', function (err,data) {
                    if(err)
                        console.log("Error escritura de archivos -> Linea 1873\n"+err);
                });

                //Si hay una persona adentro y se quiere ir
                if (pass === GLOBAL_usr_pass){
                    updateAuditoriaDataBase(GLOBAL_usr_habitacion);
                    hayUnoAdentro = 0;
                    timers.clearInterval(intervalSensores);
                    pwm.write(0.0);
                    cleanLCD();
                    pinCooler.write(abierto);
                    relayCalefaccion.off();
                    GLOBAL_usr_habitacion = "";
                    GLOBAL_usr_pass = "";
                    request(dirMusic+"musicOff", function(error, response, body) {});
                    mensajeLCDconDelay("Hasta Prontos",fechaHoyConHora());
                }else{
                    //quiere decir que no hay nadie
                    if ((GLOBAL_usr_pass === "")&&(pass.length > 0)){
                        recoveryUserByPass(pass,function(err,content){
                            if (content !== null){                    
                                //usuario existente
                                 var dBusr = content[0].email;
                                 var dbApellido = content[0].apellido;
                                 var dbIdPlaylist = content[0].idPlaylist;
                                 saveAuditoriaDataBase(dBusr);
                                 hayUnoAdentro = 1;                              
                                 cleanLCD();
                                 GLOBAL_usr_habitacion = dBusr;
                                 GLOBAL_usr_pass = pass;
                                 mensajeLCDconDelay("Bienvenido",dbApellido);
                                 request(dirMusic+"musicOn?num="+dbIdPlaylist, function(error, response, body) {});
                                 simuladorSensores(pass);
                            }else{
                                //error de password
                                cleanLCD();
                                mensajeLCDconDelay("Error Password","Intente de nuevo");
                            }
                        });
                    }else{//este usuario no es el actual, habitacion ocupada
                        cleanLCD();
                        mensajeLCDconDelay("---Habitacion---","----Ocupada---->");
                    }
                }



          }
        else{
            if (puedoEscribir == 1){
                cleanLCD();
                if (hayUnoAdentro == 1){
                    writeLCD("Ocupado",0,0);
                }else{
                    writeLCD("Libre",0,0);
                }
                    writeLCD("Pass: "+data_sin_espacio,1,0);
                }
            }  
      }
    });
  },200);
    
}



//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(0);
var B = 3975;   //Constante para el calculo de la temperatura
var lecturaAnalogica;
var resistance;
var celsius_temperature;

function simuladorSensores(pass){
   
    var dbLuz, dbTemp;
    pwm.period_us(2000);
    lecturaAnalogica = myAnalogPin.read();
    resistance = (1023 - lecturaAnalogica) * 10000 / lecturaAnalogica; //get the resistance of the sensor;
    celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
    
    
    var tempActInt = Math.floor( celsius_temperature );
    var tempInt;


    console.log("Temperatura sensada al momento del ingreso (int): "+tempActInt);
    
    recoveryUserByPass(pass, function(err,content){
            if (err)
                console.log ("----->Recovery User By Pass --- Linea 2025<------\n"+err);            
            else{
                if (content !== null){  
                    dbLuz = content[0].luz;
                    dbTemp = content[0].temp;
                }
                else{
                    //default
                    console.log("Error: Tomo valores por defecto");
                    dbLuz = 50;
                    dbTemp = 24;
                }
            }
            //Acondicionamiento de la luz
            var luz_led = (dbLuz / 100);
            if (luz_led <= 1.0){
                pwm.write(luz_led);
            }
            else{
                //default
                pwm.write(0.5);
            }
           
           
            
            
        });
        
    intervalSensores = timers.setInterval(function(){
        lecturaAnalogica = myAnalogPin.read();
        resistance = (1023 - lecturaAnalogica) * 10000 / lecturaAnalogica; //get the resistance of the sensor;
        celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        tempActInt = Math.floor( celsius_temperature ); 
        if (GLOBAL_modificoPerfil === 1){
            recoveryUserByPass(pass, function(err,content){
                if (err)
                    console.log ("----->Recovery User By Pass --- Linea 2025<------\n"+err);            
                else{
                    if (content !== null){  
                        dbLuz = content[0].luz;
                        dbTemp = content[0].temp;
                    }
                    else{
                        //default
                        console.log("Error: Tomo valores por defecto");
                        dbLuz = 50;
                        dbTemp = 24;
                    }
                }
                //Acondicionamiento de la luz
                var luz_led = (dbLuz / 100);
                if (luz_led <= 1.0){
                    pwm.write(luz_led);
                }
                else{
                    //default
                    pwm.write(0.5);
                }

            });
            console.log("-----------CAMBIO EL PERFIL EL USUARIO: "+GLOBAL_usr_habitacion+"-----------");
            GLOBAL_modificoPerfil = 0;
        }
        
       
        //Acondicionamiento de la temperatura
       
        tempInt = parseInt(dbTemp,10);
        //Tomar una nueva temperatura actual y ver como va variando con el acondicionamiento
        if (tempInt < tempActInt){
            pinCooler.write(cerrado); //Cooler ON
            relayCalefaccion.off();   //LED OFF
        }else{
            if (tempInt > tempActInt){
                relayCalefaccion.on(); //LED ON
                pinCooler.write(abierto);//Cooler OFF
            }else{
                pinCooler.write(abierto);   //Cooler OFF
                relayCalefaccion.off();     //LED OFF
            }            
        }    
    
    },1000);
}



function inciarIntelGalileo (){
    
    sequence.then(function(next){
        timers.setTimeout(function(){
            recoveryAuditoriaNULL(function(err,content){
                if (err){
                    console.log("Error base de datos --> Linea 2034");
                }else{
                    if (content === null){
                        console.log("No hay nadie, configuro todo desde cero");
                        hayUnoAdentro = 0;
                        timers.clearInterval(intervalSensores);
                        pwm.write(0.0);
                        cleanLCD();
                        pinCooler.write(abierto);
                        relayCalefaccion.off();
                        GLOBAL_usr_habitacion = "";
                        GLOBAL_usr_pass = "";
                        request(dirMusic+"musicOff", function(error, response, body) {});
                        
                    }else{
                        console.log("Hay alguien, ¿que hago?");
                         var dBusr = content[0].email;
                         recoveryUserByEmail(dBusr,function(err,content){
                             if (err){
                                 console.log("Error base de datos --> Linea 2046");
                             }else{
                                var dbApellido = content[0].apellido;
                                var dbIdPlaylist = content[0].idPlaylist;
                                var dbPass = content[0].password;
                                hayUnoAdentro = 1;                              
                                cleanLCD();
                                GLOBAL_usr_habitacion = dBusr;
                                GLOBAL_usr_pass = dbPass;
                                mensajeLCDconDelay("Bienvenido",dbApellido);
                                request(dirMusic+"musicOn?num="+dbIdPlaylist, function(error, response, body) {});
                                simuladorSensores(dbPass);          
                             }
                         });
                    }
                }
                });
            recoveryUserByPass(claveAdmin,function(err,content){
                if (err){
                    console.log("Error base de datos -- Linea 2075");
                }else{
                    if (content !== null){
                        emailAdmin = content[0].email;
                        console.log("Email del administrador: "+emailAdmin);
                    }else{
                        console.log("No se encontro el administrador!!!");
                    }
                }
            });
            next();
        },100);
    })
    .then(function(next){
        timers.setTimeout(function(){
            // serves all the static files 
            app.get(/^(.+)$/, function(req, res){ 
                console.log('static file request : ' + req.params);
                res.sendfile( appDir + req.params[0]); 
            });

            var port = process.env.PORT || 5000;
            app.listen(port, function() {
               console.log("Listening on " + port);
            });
            main();
            next();
            
        },100);        
        
    });

}

inciarIntelGalileo();


//para observar y controlar la memoria
var memwatch = require('memwatch');

var myStream = fs.createWriteStream(appDir+"/infoMemoria.txt");

memwatch.on('leak', function(info) {
    // look at info to find out about what might be leaking
    memwatch.gc();
     var str = fechaHoyConHora()+"\t============= MEMWATCH ON LEAK - "+fechaHoyConHora()+" ============\n"+info+"\n";
    myStream.write( str );
    console.log('============= MEMWATCH ON LEAK ============\n',String(info));
});

memwatch.on('stats', function(stats) {
    // do something with post-gc memory usage stats
    memwatch.gc();
    var mem = process.memoryUsage();
    console.log("Stats -> "+stats.num_full_gc);
    var str = "============= MEMWATCH STATS == "+stats.num_full_gc+" == - "+fechaHoyConHora()+" ============\nHeapUsed: "+mem.heapUsed/1000000 +"MB/HeapTotal: "+mem.heapTotal/1000000+"MB  - \nMemoria: " + mem.rss/1000000+"MB\n";
    console.log(str);
    myStream.write( str );

});

