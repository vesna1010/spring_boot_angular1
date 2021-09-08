
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponentTest', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    it('should show home page', waitForAsync(() => {
        router.navigate(['']).then(() => {
            expect(location.path()).toBe('');
        });
    }));

    it('should show play', waitForAsync(() => {
        router.navigate(['play']).then(() => {
            expect(location.path()).toBe('/play');
        });
    }));

    it('should show quizzes', waitForAsync(() => {
        router.navigate(['quizzes']).then(() => {
            expect(location.path()).toBe('/quizzes');
        });
    }));

    it('should show quizzes form', waitForAsync(() => {
        router.navigate(['quizzes/form']).then(() => {
            expect(location.path()).toBe('/quizzes/form');
        });
    }));

    it('should show quizzes form with quiz', waitForAsync(() => {
        router.navigate(['quizzes/form', 1]).then(() => {
            expect(location.path()).toBe('/quizzes/form/1');
        });
    }));

    it('should show questions', waitForAsync(() => {
        router.navigate(['questions']).then(() => {
            expect(location.path()).toBe('/questions');
        });
    }));

    it('should show questions form', waitForAsync(() => {
        router.navigate(['questions/form']).then(() => {
            expect(location.path()).toBe('/questions/form');
        });
    }));

    it('should show questions form with question', waitForAsync(() => {
        router.navigate(['questions/form', 1]).then(() => {
            expect(location.path()).toBe('/questions/form/1');
        });
    }));

});