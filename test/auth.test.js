const { AuthService } = require('../services/AuthentificationService');
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'testtest' };

    beforeEach(() => {
        db.User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
    });

    describe('authentificateUser', () => {
        it('should return true for valid user credentials', async () => {
            const result = await AuthService.authentificateUser('test@example.com', 'testtest');
            expect(result).toBe(true);
        });

        it('should return false for invalid user credentials', async () => {
            bcrypt.compare.mockResolvedValue(false);

            const result = await AuthService.authentificateUser('test@example.com', 'wrongPassword');
            expect(result).toBe(false);
        });

        it('should return false if the user does not exist', async () => {
            db.User.findOne.mockResolvedValue(null);

            const result = await AuthService.authentificateUser('nonexistent@example.com', 'anyPassword');
            expect(result).toBe(false);
        });
    });

});
