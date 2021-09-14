import Rail from 'national-rail-darwin';
import dotenv from 'dotenv';

dotenv.config();

const NRAPIKey = process.env.NRAPIKey;
const rail = new Rail(NRAPIKey);

export function get(req, res, next) {
    const slug = req.params.slug[0].split(',');
    const [type, crs] = slug;
    console.log(crs);

    if (crs.length != 3) {
        res.writeHead(422, {
            'Content-Type': 'application/json'
        });

        res.end(
            JSON.stringify({
                message: `Invalid station was entered, please try again!`
            })
        );
    } else {
        // This bit does not work - obviously because it needs a eperate page to the departures
        if (type === 'arrivals') {
            rail.getArrivalsBoardWithDetails(crs.toUpperCase(), {}, (err, result) => {
                if (err) {
                    res.writeHead(422, {
                        'Content-Type': 'application/json'
                    });

                    res.end(err.toJSON());
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify(result));
                }
            });
        } else if (type == 'departures') {
            rail.getDepartureBoardWithDetails(crs.toUpperCase(), {}, (err, result) => {
                if (err) {
                    res.writeHead(422, {
                        'Content-Type': 'application/json'
                    });

                    res.end(err.toJSON());
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify(result));
                }
            });
        } else {
            res.writeHead(422, {
                'Content-Type': 'application/json'
            });

            res.end(
                JSON.stringify({
                    message: 'Invalid board choice, please choose arrivals or departures'
                })
            );
        }
    }
}
