import React from 'react';
import ReactGA from 'react-ga';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Card from '@material-ui/core/Card';

import Container from '@material-ui/core/Container';
// API
import * as api from '../../api/match'
import { Paper, Divider, Button, Typography } from '@material-ui/core';

export default function FAQ(props) {
    const [matches, setMatches] = React.useState([]);

    useEffect(() => {


    }, []);


    return (
        <div>
            <Container maxWidth="md" style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap"
            }}>
                <div>
                    <Typography
                        variant="h6"
                    >
                        FAQ
                            </Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    <Card
                        variant="outlined"
                        style={{
                            minWidth: 280,
                            height: 45,
                            padding: 20,
                            margin: 20
                        }}
                    >
                        <Typography
                            variant="button"
                            style={{
                                fontWeight:800
                            }}
                        >
                            How to Play

                            </Typography>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{
                            minWidth: 280,
                            height: 45,
                            padding: 20,
                            margin: 20
                        }}
                    >
                        <Typography
                            variant="button"
                            style={{
                                fontWeight:800
                            }}
                        >
                            Points System & Rules

                            </Typography>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{
                            minWidth: 280,
                            height: 45,
                            padding: 20,
                            margin: 20
                        }}
                    >
                        <Typography
                            variant="button"
                            style={{
                                fontWeight:800
                            }}
                        >
                            Deposit & Payout

                            </Typography>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{
                            minWidth: 280,
                            height: 45,
                            padding: 20,
                            margin: 20
                        }}
                    >
                        <Typography
                            variant="button"
                            style={{
                                fontWeight:800
                            }}
                        >
                            Verification

                            </Typography>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{
                            minWidth: 280,
                            height: 45,
                            padding: 20,
                            margin: 20
                        }}
                    >
                        <Typography
                            variant="button"
                            style={{
                                fontWeight:800
                            }}
                        >
                            Referrals & Bonus

                            </Typography>
                    </Card>
                </div>
            </Container>
        </div>
    );

}