dynamic class dragDrop {
	public function iniciar(drags, drops, intentos, funcionFinalCorrecto, funcionFinalIncorrecto,colocarEnCentro:Boolean) {
		var _maxIntentos:Number = 16;
		var _intento:Number = 0;
		var correctos:Number = 0;
		var totalCorrectos:Number = 0;
		var errors:Number = 0;
		_maxIntentos = intentos;

		for (var i = 0; i<drags.length; i++) {
			drags[i].drop = drops[i];
			drags[i].posIniX = drags[i]._x;
			drags[i].posIniY = drags[i]._y;
			drags[i].enabled = true;
			if (drags[i].drop != "") {
				totalCorrectos += 1;
			}
			////////////////////////////////////////// 
			drags[i].onPress = function() {
				this.startDrag();
			};
			/////////////////////////////////////////
			drags[i].onRelease = function() {
				this.stopDrag();
				this.comprobarDrag(this);
			};
			/////////////////////////////////////////
			drags[i].comprobarDrag = function() {
				if (_root._intento<_maxIntentos) {
					if (this.hitTest(this.drop)) {
						this.bloquear();
						_root.correctos += 1;
						if (_root.correctos == totalCorrectos) {
							funcionFinalCorrecto();
						}
					} else {
						_root._intento += 1;
error=error +=1
						if (_root._intento<_maxIntentos) {
							this._x = this.posIniX;
							this._y = this.posIniY;
						} else {
							funcionFinalIncorrecto();
						}
					}
				} else {
					
					funcionFinalIncorrecto();
				}
			};
			/////////////////////////////////////////
			drags[i].bloquear = function() {
				
				delete this.onPress;
				delete this.onRelease;
				this.enabled = true;
				if(colocarEnCentro==true){
				this._x = this.drop._x+(this.drop._width/2)-(this._width/2);
				this._y = this.drop._y+(this.drop._height/2)-(this._height/2);
				}else{
					this._x=_xmouse;
					this._y=_ymouse;
				}
			};
		}
	}
}
