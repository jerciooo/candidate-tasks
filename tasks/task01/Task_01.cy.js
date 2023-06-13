// import klasy LoginPage
import { LoginPage } from './LoginPage';

describe('Funkcjonalno�� logowania', () => {
    let loginPage;

    beforeEach(() => {
        // tworzenie instancji klasy LoginPage
        loginPage = new LoginPage();
    });

    it('powinno zalogowa� si� przy poprawnych danych logowania', () => {
        const authService = {
            authenticate: (username, password) => true // true dla poprawnych danych
        };

        cy.spy(authService, 'authenticate').as('authenticateSpy');

        // wywo�anie fukcji login
        const result = loginPage.login('myusername', 'mypassword', authService);

        // Sprawdzenie czy dane sa poprawne
        cy.get('@authenticateSpy').should('have.been.calledOnceWithExactly', 'myusername', 'mypassword');

        // Sprawdzenie czy funkcja login zwraca true dla poprawnych danych logowania
        expect(result).to.be.true;
    });

    it('nie powinno zalogowa� si� przy niepoprawnych danych logowania', () => {
        const authService = {
            authenticate: (username, password) => false // zracaj false dla niepoprawnych danych logowania
        };

        cy.spy(authService, 'authenticate').as('authenticateSpy');

        // wywo�anie fukcji login
        const result = loginPage.login('invaliduser', 'wrongpassword', authService);

        // Sprawdzenie czy dane sa poprawne
        cy.get('@authenticateSpy').should('have.been.calledOnceWithExactly', 'invaliduser', 'wrongpassword');

        // Sprawdzenie, czy funkcja login zwraca false dla niepoprawnych danych logowania
        expect(result).to.be.false;
    });
});