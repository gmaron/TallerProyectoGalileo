var spotifyManager = {
	musicNext : function (){
	    new Ajax.Request('/musicSiguiente', {
	      method: 'post',
	      parameters: {pass:$('pass').serialize(true)}
	      });
    },
    musicBack : function (){
    	new Ajax.Request('/musicAnterior', {
          method: 'post',
          parameters: {pass:$('pass').serialize(true)}
          });
    },
        
    musicResume : function(){
        new Ajax.Request('/resumeMusic', {
          method: 'post',
          parameters: {pass:$('pass').serialize(true)}
          });
    },
        
    musicPause : function (){
            new Ajax.Request('/musicPause', {
              method: 'post',
              parameters: {pass:$('pass').serialize(true)}
              });
        }
}