/**
 * Created by Umar on 16/01/2017.
 *
 * Here you can set all the DB specifics which are needed in 'scripts/create_database.js' such as seen below.
 */
module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'root',
        'password': 'password'
    },
    'database': 'DB8',
    'users_table': 'users',
    'auction_table': 'auctions',
    'results_table' : 'results',
    'unresolved_table' : 'unresolved'
};