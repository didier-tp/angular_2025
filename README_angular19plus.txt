Adaptation pour angular 19:
---------------------------

Au sein de @Component() si en version --no-standalone , alors besoin d'ajouter standalone : false
car depuis la version 19 d'angular @Component() est maintenant interprété par défaut 
avec standalone : true plutôt que standalone : false

----
donc si copier/coller d'un ancien code (angular 12,...,15) , besoin d'ajouter standalone : false
ou bien standalone : true selon le contexte
