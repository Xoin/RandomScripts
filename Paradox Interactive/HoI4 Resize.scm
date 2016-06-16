(script-fu-register
          "script-fu-hoi4"                        ;func name
          "HOI4 Resize"                                  ;menu label
          "Quick image resizer"              ;description
          "who cares"                             ;author
          "who cares"        ;copyright notice
          "????"                          ;date created
          ""                     ;image type that the script works on
		  SF-IMAGE    "Image"         0
		  SF-DRAWABLE "Drawable" 0
          SF-STRING      "Tag"          "HOL"   ;a string variable
          SF-DIRNAME	"Location" "D:\\Data\\Documents\\Paradox Interactive\\Hearts of Iron IV\\mod\\terribleflags\\gfx\\flags"
		  SF-OPTION   	"Idealogy" '(_"Democratic"
                                     _"Fascism"
									_"Neutrality"
									_"Communism")
)
(script-fu-menu-register "script-fu-hoi4" "<Image>/Paradox/HOI4")
(define (script-fu-hoi4 image drawable inTag inLocation inIdealogy )
	(let* ( (idea "democratic")
	)
	(if (= inIdealogy 0)
		(set! idea "democratic")
	)
	(if (= inIdealogy 1)
		(set! idea "fascism")
	)
	(if (= inIdealogy 2)
		(set! idea "neutrality")
	)
	(if (= inIdealogy 3)
		(set! idea "communism")
	)
	(gimp-image-scale image 82 52)
	(gimp-image-set-resolution image 82 52)
	(file-tga-save RUN-NONINTERACTIVE image drawable (string-append inLocation "\\" inTag "_"idea ".tga") (string-append inLocation "\\" inTag "_" idea ".tga") 0 0)
	(gimp-image-scale image 41 26)
	(gimp-image-set-resolution image 41 26)
	(file-tga-save RUN-NONINTERACTIVE image drawable (string-append inLocation "\\medium\\" inTag "_" idea ".tga") (string-append inLocation "\\medium\\" inTag "_" idea ".tga") 0 0)
	(gimp-image-scale image 10 7)
	(gimp-image-set-resolution image 10 7)
	(file-tga-save RUN-NONINTERACTIVE image drawable (string-append inLocation "\\small\\" inTag "_" idea ".tga") (string-append inLocation "\\small\\" inTag "_" idea ".tga") 0 0)
	)
)