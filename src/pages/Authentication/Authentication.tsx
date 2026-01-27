import TaskyDoLogo from '../../assets/TaskyDoLogo.svg';
import Card from '../../components/Card/card';
import { memo, useEffect, useState } from 'react';
import {
    StyledHeader,
    StyledError,
    StyledSeparator,
    StyledFooter,
    StyledAuthWrapper,
} from './authentication.styles';
import SignUp from './SignUp';
import Login from './Login';
import Button from 'src/components/Button/button';

const Authentication = memo(
    ({ type = 'login' }: { type?: 'login' | 'signup' }) => {
        const [authType, setAuthType] = useState(type);
        const [formError, setFormError] = useState<string>();

        useEffect(() => {
            setAuthType(type);
        }, [type]);

        return (
            <StyledAuthWrapper justifyContent="center">
                <Card>
                    <StyledHeader justifyContent="center" alignItems="center">
                        <img alt="logo of tasky do app" src={TaskyDoLogo} />
                    </StyledHeader>
                    {formError && <StyledError>{formError}</StyledError>}
                    {authType === 'login' ? (
                        <Login setFormError={setFormError} />
                    ) : (
                        <SignUp setFormError={setFormError} />
                    )}
                    <StyledSeparator
                        alignItems="center"
                        justifyContent="space-around"
                    >
                        <hr />
                        <span>
                            <b>OR</b>
                        </span>
                        <hr />
                    </StyledSeparator>
                    <StyledFooter direction="column" alignItems="center">
                        <p>
                            {authType === 'login' ? `Don't` : 'Already'} have an
                            account?
                        </p>
                        <Button
                            onClick={() => {
                                if (authType === 'login') {
                                    setAuthType('signup');
                                } else {
                                    setAuthType('login');
                                }
                            }}
                            variant="link"
                        >
                            {authType === 'login' ? 'SignUp' : 'Login'}
                        </Button>
                    </StyledFooter>
                </Card>
            </StyledAuthWrapper>
        );
    },
);

export default Authentication;
