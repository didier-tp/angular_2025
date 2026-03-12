describe('premiers tests', () => {
    //it('1+1=2', () => { let a=1; let b=1; expect(a+b+1).toBe(2) });//avec erreur
    it('1+1=2', () => { let a=1; let b=1; expect(a+b).toBe(2) });
    it('2+2=4', () => expect(2+2).toBe(4));
    });

/*
Test élémentaire à lancer via :

tsc
jasmine dist/out-tsc\src\app\basicTest.spec.js

-----
après
npm install -g jasmine 
si nécessaire

*/

