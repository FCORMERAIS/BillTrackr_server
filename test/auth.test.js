const { AuthService } = require('../services/AuthentificationService');
const db = require('../models');
const bcrypt = require('bcrypt');
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

    describe('createJWT', () => {
        it('should create a JWT token for a valid user', async () => {
            jwt.sign.mockReturnValue('token');

            const token = await AuthService.createJWT('test@example.com');
            expect(token).toBe('token');
        });
    });

    describe('generateRefreshToken', () => {
        it('should create a refresh token for a valid user', async () => {
            jwt.sign.mockReturnValue('refreshToken');

            const refreshToken = await AuthService.generateRefreshToken('test@example.com');
            expect(refreshToken).toBe('refreshToken');
        });
    });

    describe('verifyRefreshToken', () => {
        it('should verify a valid refresh token', async () => {
            jwt.verify.mockReturnValue(mockUser);

            const decoded = await AuthService.verifyRefreshToken('validToken');
            expect(decoded.email).toBe(mockUser.email);
        });

        it('should return null for an invalid refresh token', async () => {
            jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

            const decoded = await AuthService.verifyRefreshToken('invalidToken');
            expect(decoded).toBeNull();
        });
    });
});
