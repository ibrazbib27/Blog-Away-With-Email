import * as React from "react";
import {useState} from "react";
import {ModalObj} from "../blog_maker/NewBlog";
import {json} from "../../utils/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {RouteComponentProps} from "react-router-dom";

export interface ModalProps extends RouteComponentProps<{ id: string }> {
    invalid: any;
    post_user: any;
    validate_form: any;
    tag_func: any;
    form_element: HTMLFormElement;
    mod_obj: ModalObj[];
    blog_obj: any;
    tag_valid: any;
    tag_obj: { label: string; value: string }[];
}

const ModalConfirmation: React.FC<ModalProps> = (props) => {
    const [option, setOption] = useState<boolean | null>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        if (props.validate_form()) updateBlog();
        else setTimeout(props.invalid, 200);

        return false;
    };
    let updateTags = async () => {
        props.tag_obj.forEach(async (val) => {
            try {
                let formData: any = {};
                formData.blogid = props.match.params.id;
                formData.tagid = val.value;
                await json(`/api/blogs/blogtagspost`, "POST", formData);
            } catch (e) {
                console.log(e.message);
            }
        });
    };
    let deleteTags = async () => {
        try {
            await json(`/api/blogs/${props.match.params.id}/tags`, "DELETE");
        } catch (e) {
            console.log(e.message);
        }
    };

    let updateBlog = async () => {
        await deleteTags();
        await updateTags();
        let formData: any = props.blog_obj();
        try {
            let response = await json(
                `/api/blogs/${props.match.params.id}/blog`,
                "PUT",
                formData
            );

            if (response)
                props.history.push({
                    pathname: "/",
                    state: {
                        heading: "Your Changes have been Updated to Your Blog!",
                        body:
                            "Your changes have been successfully updated to your blogs, and can be viewed from the timeline.",
                    },
                });
        } catch (e) {
            console.log(e.message);
        }
    };
    let deleteBlog = async () => {
        try {
            await deleteTags();
            let response = await json(
                `/api/blogs/${props.match.params.id}/blog`,
                "DELETE"
            );

            if (response)
                props.history.push({
                    pathname: "/",
                    state: {
                        heading: "Your Blog has been Deleted!",
                        body:
                            "Your blog has been delete and can no longer be viewed from the timeline",
                    },
                });
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>
            <div
                className={
                    "mx-1 my-md-3 my-3 order-2 order-md-1 col-lg-3 col-md-5 col-12"
                }
            >
                <Button
                    onClick={() => {
                        setOption(false);
                        handleShow();
                    }}
                    className="shadow-sm w-100"
                    variant="danger"
                >
                    Delete
                </Button>
            </div>{" "}
            <div
                className={
                    "mx-1 my-md-3 my-3 order-1 order-md-2 col-lg-3 col-md-5 col-12"
                }
            >
                <Button
                    onClick={() => {
                        setOption(true);
                        handleShow();
                    }}
                    className="shadow-sm w-100"
                    variant="primary"
                >
                    Save Changes
                </Button>
            </div>
            <Modal
                id={"modalConfirmation"}
                className={"text-center"}
                show={show}
                onHide={handleClose}
            >
                <Modal.Header className={"w-100 px-3 mx-auto text-center"}>
                    <Modal.Title className={"px-0 w-100"}>
                        {option ? props.mod_obj[0].header : props.mod_obj[1].header}
                    </Modal.Title>{" "}
                    <div className={"px-0"}>
            <span
                onClick={handleClose}
                className="close pointer"
                aria-label="Close"
                aria-hidden="true"
            >
              &times;
            </span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {option ? props.mod_obj[0].body : props.mod_obj[1].body}
                </Modal.Body>
                <Modal.Footer className={"row mx-0 w-100 justify-content-between"}>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="danger"
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </div>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="success"
                            onClick={() => {
                                if (option) {
                                    handleClose();
                                    handleSubmit();
                                } else deleteBlog();
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirmation;
