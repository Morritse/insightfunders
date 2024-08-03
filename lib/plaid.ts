import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'
import { config } from 'dotenv';

config({ path: '.env' });

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        }
    }
})

export const plaidClient = new PlaidApi(configuration)