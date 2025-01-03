Ces deux variantes de solutions sont pour l'instant en version 18.2 d'angular

la version "my-app" est avec module (--no-standalone) et avec bootstrap-css
cette version ressemble a ce qui était déjà faisable au sein des versions 11,12,13,14,15,16 d'angular

la version "my-standalone-app" est sans module et sans bootstrap-css
cette version n'est envisageable qu'avec angular 17 ou 18

=======

Adaptation pour angular 19:
---------------------------

Au sein de @Component() si en version --no-standalone , alors besoin d'ajouter standalone : false
car depuis la version 19 d'angular @Component() est maintenant interprété par défaut avec standalone : true plutôt que standalone : false