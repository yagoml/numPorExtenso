### numPorExtenso
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
###

define [], ->

	UNIDADES = [ "Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove",
	"Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito",
	"Dezenove"]
	DEZENAS = [ "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "oitenta", "Noventa"]
	CENTENAS = ["Cem", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seissentos", "Setecentos", "Oitocentos", "Novecentos"]
	MILHAR = [ "Mil", "Milhão", "Bilhão", "Trilhão", "Quatrilhão"]
	MILHARES = [ "Mil", "Milhões", "Bilhões", "Trilhões", "Quatrilhões"]

	class NumPorExtenso

		convertToWords: (num, money = false) ->
			cWords = if money then " Rea#{if num >= 1 and num < 2 then 'l' else 'is'}" else ''
			nLeft = Math.floor num
			i = 0

			while nLeft
				cWords = (if i then @convertToHundreds(nLeft) + " " + (if nLeft is 1 then MILHAR[i - 1] else MILHARES[i - 1]) else @convertToHundreds(nLeft)) + cWords if nLeft % 1000
				nLeft = Math.floor nLeft / 1000
				i++

			num = Math.round(num * 100) % 100
			cWords += " e " + @convertToHundreds(num) + (if money then " Centavos" else '') if num
			"(#{cWords})"

		convertToHundreds: (num) ->
			cWords = ""
			num %= 1000

			if num > 99 # CENTENAS
				nNum = Number (String num).charAt(0)
				cWords = if num is 100 then CENTENAS[nNum-1] else CENTENAS[nNum]
				num %= 100
				cWords += " e " if num

			if num > 19 # DEZENAS
				nNum = Number (String num).charAt(0)
				cWords += DEZENAS[nNum - 2]
				num %= 10
				cWords += " e " if num

			# UNIDADES
			cWords += UNIDADES[Math.floor num] if num

			cWords

	new NumPorExtenso