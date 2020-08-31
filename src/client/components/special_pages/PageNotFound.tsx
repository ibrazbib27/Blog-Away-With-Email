import * as React from "react";

import {RouteComponentProps} from "react-router-dom";
import Button from "react-bootstrap/Button";

export interface PgNotFoundProps extends RouteComponentProps<any> {}

const PageNotFound: React.FC<PgNotFoundProps> = (props) => {
    return (
        <>
            <h1 className={"text-monospace"}>SORRY,</h1>
            <h3 className={"text-monospace mb-5"}>we couldn't find that page!</h3>

            <p>
                It looks like the page you were trying to find does not exist. Click the
                button below to continue on with your Blog Away journey!
            </p>

            <Button
                className={"shadow-sm mt-5"}
                variant={"light"}
                onClick={props.history.goBack}
            >
                Go Back!
            </Button>
        </>
    );
};
export default PageNotFound;
