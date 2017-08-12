
/* numPorExtenso
	Escreve número por extenso (pt-br)
	____________________________________________________________________
	@Parâmetros
		@num float: Número à ser convertido
		@money boolean (opcional): se passado adiciona 'Reais' e 'Centavos'
	____________________________________________________________________
	@Exemplo NumPorExtenso.convertToWords(666, true)
		@Retorna Seissentos e Sessenta e Seis
	____________________________________________________________________
	Autor: YagoML
*/

var CENTENAS, DEZENAS, MILHAR, MILHARES, NumPorExtenso, UNIDADES;
UNIDADES = ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"];
DEZENAS = ["Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "oitenta", "Noventa"];
CENTENAS = ["Cem", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seissentos", "Setecentos", "Oitocentos", "Novecentos"];
MILHAR = ["Mil", "Milhão", "Bilhão", "Trilhão", "Quatrilhão"];
MILHARES = ["Mil", "Milhões", "Bilhões", "Trilhões", "Quatrilhões"];

NumPorExtenso = {
	convertToWords: function(num, money) {
		var cWords, i, nLeft;
		if (money == null) {
			money = false;
		}
		cWords = money ? " Rea" + (num >= 1 && num < 2 ? 'l' : 'is') : '';
		nLeft = Math.floor(num);
		i = 0;
		while (nLeft) {
			if (nLeft % 1000) {
				cWords = (i ? this.convertToHundreds(nLeft) + " " + (nLeft === 1 ? MILHAR[i - 1] : MILHARES[i - 1]) : this.convertToHundreds(nLeft)) + cWords;
			}
			nLeft = Math.floor(nLeft / 1000);
			i++;
		}
		num = Math.round(num * 100) % 100;
		if (num) {
			cWords += " e " + this.convertToHundreds(num) + (money ? " Centavos" : '');
		}
		return "(" + cWords + ")";
	},

	convertToHundreds: function(num) {
		var cWords, nNum;
		cWords = "";
		num %= 1000;
		if (num > 99) {
			nNum = Number((String(num)).charAt(0));
			cWords = " " + (num === 100 ? CENTENAS[nNum - 1] : CENTENAS[nNum]);
			num %= 100;
			if (num) {
				cWords += " e ";
			}
		}
		if (num > 19) {
			nNum = Number((String(num)).charAt(0));
			cWords += DEZENAS[nNum - 2];
			num %= 10;
			if (num) {
				cWords += " e ";
			}
		}
		if (num) {
			cWords += UNIDADES[Math.floor(num)];
		}
		return cWords;
	}
}