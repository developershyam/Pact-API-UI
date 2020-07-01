import { TestBed } from "@angular/core/testing";
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { PactWeb } from '@pact-foundation/pact-web';
import { User } from './user';

describe('UserPactService', () => {

    let provider;

    // Setup Pact mock server
    beforeAll(async () => {

        provider = await new PactWeb({
            host: 'localhost',
            port: 9191
        });

        // required for slower environments
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Required if run with `singleRun: false`
        await provider.removeInteractions();
    });

    // Configure Angular Testbed
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                UserService
            ]
        });
    });

    // Verify test
    afterEach(async () => {
        await provider.verify();
    });

    // Create contract
    afterAll(async () => {
        await provider.finalize();
    });

    describe("get users list", () => {

        const expectedUsers: User[] = [{name: 'Developer', email: 'dev@test.org'}];
        beforeAll(async () => {
            await provider.addInteraction({
                state: 'get all users',
                uponReceiving: 'Request to GET users',
                withRequest: {
                    method: 'GET',
                    path: '/api/getAllUsers'
                },
                willRespondWith: {
                    status: 200,
                    body: expectedUsers
                }
            });
        });

        it('should return list of users', async () => {
            const userService: UserService = TestBed.get(UserService);
            userService['baseUrl'] = '/api/';
            await userService.getUsers().toPromise().then(response => {
                expect(response).toEqual(expectedUsers);
            });
        });
    });

});