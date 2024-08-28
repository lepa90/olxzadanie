const fs = require('fs');

try {
    const data = fs.readFileSync('dane.txt', 'utf8');
    const lines = data.split('\n');

    // Wczytanie danych o drużynach
    const nazwaDruzynyA = lines[0].trim();
    const wspolczynnikPredkosciA = parseFloat(lines[1].trim());

    const nazwaDruzynyB = lines[2].trim();
    const wspolczynnikPredkosciB = parseFloat(lines[3].trim());

    // Wczytanie rozmiaru planszy
    const szerokoscPlanszy = parseInt(lines[4].trim());
    const wysokoscPlanszy = parseInt(lines[5].trim());

    // Obliczenie prędkości dla figur o parzystej współrzędnej x
    let vParzyste = 1 * wspolczynnikPredkosciA;

    // Obliczenie prędkości dla figur o nieparzystej współrzędnej x
    let vNieparzyste = Math.pow(2, wspolczynnikPredkosciB);

    // Jeśli figury zaczynają u góry planszy, przemnóż prędkość przez -1
    if (nazwaDruzynyA === 'Góra') {
        vParzyste *= -1;
        vNieparzyste *= -1;
    }

    const plansza = Array.from({ length: wysokoscPlanszy }, () => Array(szerokoscPlanszy).fill('.'));
    let pozycjaDruzynyA = 0;
    let pozycjaDruzynyB = wysokoscPlanszy - 1;

    // Symulacja ruchu
    while (true) {
        if (pozycjaDruzynyA < wysokoscPlanszy && pozycjaDruzynyA >= 0) {
            plansza[pozycjaDruzynyA][0] = 'A';
        }
        if (pozycjaDruzynyB < wysokoscPlanszy && pozycjaDruzynyB >= 0) {
            plansza[pozycjaDruzynyB][szerokoscPlanszy - 1] = 'B';
        }

        pozycjaDruzynyA += vParzyste;
        pozycjaDruzynyB += vNieparzyste;

        if (pozycjaDruzynyA >= wysokoscPlanszy || pozycjaDruzynyB < 0) {
            break;
        }
    }

    // Wyświetlenie wyników
    if (pozycjaDruzynyA >= wysokoscPlanszy) {
        console.log(nazwaDruzynyA);
    } else {
        console.log(nazwaDruzynyB);
    }
} catch (err) {
    console.error('error');
}
