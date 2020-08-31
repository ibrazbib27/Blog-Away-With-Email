import * as React from "react";
import {useEffect, useState} from "react";
import * as moment from "moment";

import {json} from "../../utils/api";
import * as $ from "jquery";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {Blog} from "../App";
import ModalConfirmation from "../modal/ModalConfirmation";
import AlertModal from "../modal/WarningAlertModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import SuccessAlertModal from "../modal/SuccessAlertModal";

library.add(faInfoCircle);

export interface NewBlogProps
    extends RouteComponentProps<{ id: null | string }> {}

export interface ModalObj {
    header: string;
    body: string;
}

const NewBlog: React.FC<NewBlogProps> = (props) => {
    $(document).ready(function () {
        starterStyles();
    });
    const starterStyles = () => {
        if (blog.content.length > 0 && trueLength) {
            setTextLength(10000 - blog.content.length);
            setTrueLength(false);
        }

        tagsValidationColors("#ced4da");
        if (!props.match.params.id) authorsValidationColors("#ced4da");

        if (submitted) {
            if (isTitle) isValidLength("#title", 0);
            if (isContent) isValidLength("#message", 0);

            if (isTag) {
                if ($(".select__multi-value__label").length > 0)
                    selectValid(true, true);
                else selectValid(true, false);
            }
        }

        selectCss();
    };

    const renderTooltipTitle = (props: any) => (
        <Tooltip id="button-tooltip_title" {...props}>
            In order for you to successfully publish your blog post, you must enter
            the blog's title here (cannot be blank and cannot exceed 60 characters).
        </Tooltip>
    );
    const renderTooltipImg = (props: any) => (
        <Tooltip id="button-tooltip_img" {...props}>
            The image url that you enter must end with one of the following: .gif,
            .jpg, .jpeg, and .png. In order to effectively save a new image to your
            blog you must click the "Upload Image" button. Upon a successful image
            upload you should see the image on your screen change to the image located
            at the image url that you have entered. Upon an unsuccessful image upload
            you should get an error message and the image on the screen should not
            update as well. If you wish to save a new image make sure your new image
            is uploaded on the screen prior to creating or saving changes to your
            blog.
        </Tooltip>
    );
    const renderTooltipAuthor = (props: any) => (
        <Tooltip id="button-tooltip_author" {...props}>
            In order for you to successfully publish your blog post, you must select
            an author here.
        </Tooltip>
    );
    const renderTooltipTag = (props: any) => (
        <Tooltip id="button-tooltip_author" {...props}>
            In order for you to successfully publish your blog post, you must select
            at least one tag here.
        </Tooltip>
    );
    const renderTooltipContent = (props: any) => (
        <Tooltip id="tooltip-top" {...props}>
            In order for you to successfully publish your blog post, you must enter
            the blog's content here (cannot be blank and cannot exceed 10000
            characters).
        </Tooltip>
    );

    const modalText: ModalObj[] = [
        {
            header: "Update Confirmation",
            body: "Are you sure you would like to makes changes to this blog?",
        },
        {
            header: "Delete Confirmation",
            body: "Are you sure you would like to delete this blog?",
        },
    ];

    const [blog, setBlog] = useState<Blog>({
        id: "",
        title: "",
        img_src: "",
        content: "",
        authorid: "",
        name: "",
        tags: [{ label: "", value: "" }],
        _created: "",
    });

    const [tagOption, setTagOptions] = useState<
        { value: string; label: string }[]
        >([]);
    const [authorOption, setAuthorOptions] = useState<{
        value: string;
        label: string;
    }>({ value: "", label: "" });
    const [authors, setAuthors] = useState<{ value: string; label: string }[]>(
        []
    );
    const [trueLength, setTrueLength] = useState<boolean>(true);
    const [errShow, setErrShow] = useState<boolean>(false);
    const handleClose = () => setErrShow(false);
    const handleShow = () => setErrShow(true);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isTitle, setIsTitle] = useState<boolean>(false);
    const [isTag, setIsTag] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
    const [heading, setHeading] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [redirect, setRedirect] = useState<boolean>(true);
    const [lastLink, setLastLink] = useState<string>("");
    const [sucShow, setSucShow] = useState<boolean>(false);
    const handleCloseMod = () => setSucShow(false);
    const handleShowMod = () => setSucShow(true);
    const formElement: HTMLFormElement = document.getElementById(
        "blog_form"
    ) as HTMLFormElement;
    const [textLength, setTextLength] = useState(10000);

    const selectCss = () => {
        $(".select__indicators").css("cursor", "pointer");
        $(".select__control").css({
            cursor: "text",
            "box-shadow": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
            "border-radius": "0.25rem",
            "border-style": "solid",
            "border-width": "1px",
        });
        if (props.match.params.id === undefined) {
            $("#authors .css-1hb7zxy-IndicatorsContainer").css("cursor", "pointer");
            $("#authors div").first().css({
                cursor: "text",
                "box-shadow": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
                "border-radius": "0.25rem",
                "border-style": "solid",
                "border-width": "1px",
            });
        }
    };
    const isValidLength = (id: string, length: number) => {
        $(id).on("input", () => {
            if ($(id).val().toString().trim().length > length) {
                if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
            } else {
                if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
            }
        });
    };
    const tagsValidationColors = (color: string) => {
        if ($("#tags").hasClass("is-invalid"))
            $(".select__control").css("border-color", "#dc3545");
        else $(".select__control").css("border-color", `${color}`);
    };
    const authorsValidationColors = (color: string) => {
        if ($("#authors").hasClass("is-invalid"))
            $("#authors div").first().css("border-color", "#dc3545");
        else $("#authors div").css("border-color", `${color}`);
    };
    let selectAuthorChange = (newOptions: { value: string; label: string }) => {
        if ($("#authors").hasClass("is-invalid")) {
            if (newOptions !== null) selectValid(false, true);
            else selectValid(false, false);
        }
        setAuthorOptions(newOptions);
    };
    const selectValid = (selectName: boolean, cssValidation: boolean) => {
        if (cssValidation) {
            if ($(selectName ? "#tags" : "#authors").hasClass("is-invalid"))
                $(selectName ? "#tags" : "#authors").removeClass("is-invalid");
        } else {
            if (!$(selectName ? "#tags" : "#authors").hasClass("is-invalid"))
                $(selectName ? "#tags" : "#authors").addClass("is-invalid");
        }

        if (selectName)
            $(".select__control").css(
                "border-color",
                cssValidation ? "#80bdff" : "#dc3545"
            );
        else
            $("#authors div")
                .first()
                .css("border-color", cssValidation ? "#ced4da" : "#dc3545");
    };

    let selectTagsChange = (newOptions: { value: string; label: string }[]) => {
        if (!submitted) {
            const cssValidation: boolean = $("#tags").hasClass("is-invalid");

            setTimeout(() => {
                $(".select__control").css(
                    "border-color",
                    cssValidation ? "#dc3545" : "#80bdff"
                );
            }, 10);
        }

        setTagOptions(newOptions);
    };
    let postTag = async () => {
        tagOption.forEach(async (data) => {
            try {
                let tagData: any = {};
                tagData.tagid = parseInt(data.value);
                await json(`/api/blogs/createblogtags`, `POST`, tagData);
            } catch (e) {
                console.log(e.message);
            }
        });
    };

    let getTags = async () => {
        try {
            let res = await json(`/api/blogs/tags`, "GET");
            let myTags = res;
            let tagsList = JSON.parse(JSON.stringify(myTags));
            let tempList: { value: string; label: string }[] = [];
            tagsList.forEach((val: { id: number; name: string }) => {
                tempList.push({ label: `${val.name}`, value: `${val.id}` });
            });
            setTags(tempList);
        } catch (e) {
            console.log(e.message);
        }
    };
    let getAuthors = async () => {
        try {
            let myAuthors = await json(`/api/blogs/authors`, "GET");
            let authorList = JSON.parse(JSON.stringify(myAuthors));
            let tempList: { value: string; label: string }[] = [];
            authorList.forEach((val: { id: number; name: string }) => {
                tempList.push({ value: `${val.id}`, label: `${val.name}` });
            });
            setAuthors(tempList);
        } catch (e) {
            console.log(e.message);
        }
    };
    let getBlog = async () => {
        try {
            let res1 = await json(
                `/api/blogs/${props.match.params.id}/getblog`,
                "GET"
            );
            let blogMore = res1;
            let myBlog = JSON.parse(JSON.stringify(blogMore));

            let res2 = await json(
                `/api/blogs/${props.match.params.id}/gettag`,
                "GET"
            );
            let newTags = res2;
            let tags = JSON.parse(JSON.stringify(newTags));
            let tagObj: [{ label: string; value: string }] = [
                { label: "", value: "" },
            ];
            let count: number = 0;
            for (const tag in tags[0]) {
                if (count === 0)
                    tagObj.splice(0, 1, {
                        label: `${tags[0][tag].name}`,
                        value: `${tags[0][tag].id}`,
                    });
                else
                    tagObj.push({
                        label: `${tags[0][tag].name}`,
                        value: `${tags[0][tag].id}`,
                    });
                count++;
            }
            setTagOptions(tagObj);
            setBlog({
                id: `${myBlog[0].id}`,
                title: `${myBlog[0].title}`,
                img_src: `${myBlog[0].img_src}`,
                content: `${myBlog[0].content}`,
                authorid: `${myBlog[0].authorid}`,
                name: `${myBlog[0].name}`,
                tags: tagObj,
                _created: `${myBlog[0]._created}`,
            });
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("role") === "admin") {
            getAuthors();
            getTags();
            if (props.match.params.id) {
                getBlog();
            }
            if (props.location.state) {
                const modalInfo: any = props.location.state;
                if (modalInfo.heading) setHeading(modalInfo.heading);

                if (modalInfo.body) setBody(modalInfo.body);

                if (modalInfo.heading && modalInfo.body) setSucShow(true);

                props.history.push({
                    pathname: props.location.pathname,
                    state: {},
                });
            }
        }

        if (localStorage.getItem("role") === "member") {
            if (props.location.state) {
                const modalInfo: any = props.location.state;

                if (modalInfo.prevPath) {
                    setLastLink(modalInfo.prevPath);
                    setRedirect(false);
                }
            }
        }
    }, []);

    let handleUpload = () => {
        const img: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        const imgUrl: HTMLInputElement = document.getElementById(
            "img_upload"
        ) as HTMLInputElement;
        if (
            imgUrl.value.endsWith(".gif") ||
            imgUrl.value.endsWith(".jpg") ||
            imgUrl.value.endsWith(".jpeg") ||
            imgUrl.value.endsWith(".png")
        )
            img.src = imgUrl.value;

        else setErrShow(true);

        return false;
    };
    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setTextLength(10000 - e.currentTarget.value.length);
    };

    const findInvalid = () => {
        let tempElement: string;

        if ($(".is-invalid").length > 0)
            tempElement = $(".is-invalid").first().attr("id").toString();

        if ($(`#${tempElement}`).hasClass("form-control"))
            $(`#${tempElement}`).focus();
        else $(`#${tempElement} input`).first().focus();
    };

    let lengthCheck = (elementText: string, elementId: string) => {
        let elementLength: boolean = true;
        if ($(elementId).hasClass("is-invalid"))
            $(elementId).removeClass("is-invalid");

        if (elementText.trim().length === 0) {
            elementLength = false;
            $(elementId).addClass("is-invalid");
            $(elementId).val(elementText.trim());
        }

        return elementLength;
    };
    const isFormValid = () => {
        if (!submitted) setSubmitted(true);

        const title: boolean = lengthCheck($("#title").val().toString(), "#title");

        if (title) {
            if (isTitle) setIsTitle(false);
        } else {
            if (!isTitle) setIsTitle(true);
        }

        const content: boolean = lengthCheck(
            $("#message").val().toString(),
            "#message"
        );

        if (content) {
            if (isContent) setIsContent(false);
        } else {
            if (!isContent) setIsContent(true);
        }

        let tagsValidation: boolean;
        if (tagOption !== null) {
            if (tagOption.length > 0) tagsValidation = true;
            else tagsValidation = false;
        } else tagsValidation = false;

        if (tagsValidation) {
            if (isTag) setIsTag(false);
        } else {
            if (!isTag) setIsTag(true);
        }

        let authorsValidation: boolean;

        if (props.match.params.id === undefined) {
            authorsValidation =
                authorOption.value.toString().length > 0 ? true : false;
            if (authorsValidation) selectValid(false, true);
            else selectValid(false, false);
        } else authorsValidation = true;

        if (tagsValidation) selectValid(true, true);
        else selectValid(true, false);

        if (authorsValidation === undefined) authorsValidation = true;

        if (title && content && tagsValidation && authorsValidation) return true;
        else return false;
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFormValid()) {
            if (props.match.params.id === undefined) postFunc();
        } else findInvalid();
    };

    let blogForm = () => {
        let form = $(`#blog_form`).serializeArray();
        let formData: any = {};
        formData.title = form[0].value;
        let imgElement: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        formData.img_src = imgElement.src;
        formData.authorid = authorOption.value;
        formData.content = form[2].value;
        formData._created = moment().format("LL").toString();
        return formData;
    };
    let postFunc = async () => {
        let formData: any = blogForm();
        try {
            let result: any = await json("/api/blogs/add", "POST", formData);
            if (result) await postTag();
            props.history.push({
                pathname: "/",
                state: {
                    heading: "New Blog Added to Your Timeline!",
                    body:
                        "Congratulations! Your blog has created and can be viewed in the timeline.",
                },
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    return redirect ? (
        localStorage.getItem("role") === "admin" ? (
            <>
                <Jumbotron
                    style={{ backgroundColor: "lightgrey", marginTop: "2.0rem" }}
                    className="text-center d-flex align-items-stretch shadow-lg zoom p-0 border border-dark text-dark"
                >
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        id={"blog_form"}
                        className={"mx-auto my-0 w-100"}
                    >
                        <Form.Text className={"font-italic small text-dark m-0"}>
                            ( <span className={"required"}></span>Indicates required )
                        </Form.Text>

                        <Row className={"w-100 justify-content-center mx-0 mb-0 mt-5"}>
                            <Form.Group className={"my-2 col-12 col-md-10"}>
                                <Form.Label className={"required"}>
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Title"
                                            : "Edit Title"}
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipTitle}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name={"title"}
                                    className={"shadow-sm"}
                                    id={"title"}
                                    defaultValue={
                                        props.match.params.id === undefined ? "" : blog.title
                                    }
                                    maxLength={60}
                                    required
                                    autoFocus
                                />
                                <Form.Control.Feedback className={"text-left"} type="invalid">
                                    Enter the title of your blog
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                            <Col
                                xs={12}
                                sm={10}
                                md={8}
                                lg={6}
                                className={"my-2 order-1 display-img"}
                            >
                                <Image
                                    src={
                                        props.match.params.id === undefined
                                            ? "http://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-Picture.png"
                                            : blog.img_src
                                    }
                                    className={"shadow-sm display-img w-100 border border-dark"}
                                    id={"img_src"}
                                    rounded
                                />
                            </Col>

                            <Col className={" my-4 order-2"} xs={12} md={10}>
                                <Form.Group className={"my-2 w-100"}>
                                    <Form.Label>
                                        <b>
                                            {props.match.params.id === undefined
                                                ? "Image Url"
                                                : "Edit Image Url"}
                                        </b>
                                        <OverlayTrigger
                                            placement="right-end"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipImg}
                                        >
                                            <FontAwesomeIcon
                                                className={"ml-2"}
                                                size={"sm"}
                                                icon={["fas", "info-circle"]}
                                            />
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <InputGroup className={"shadow-sm"}>
                                        <Form.Control
                                            defaultValue={
                                                props.match.params.id === undefined
                                                    ? "http://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-Picture.png"
                                                    : blog.img_src
                                            }
                                            name={"img_src"}
                                            type="url"
                                            id={"img_upload"}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                onClick={handleUpload}
                                                variant={"primary"}
                                                size={"sm"}
                                            >
                                                Upload Image
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        {props.match.params.id ? null : (
                            <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                                <Form.Group className={"my-2 col-12 col-md-10"}>
                                    <Form.Label className={"required"}>
                                        <b>
                                            {props.match.params.id === undefined
                                                ? "Author"
                                                : "Edit Author"}
                                        </b>
                                        <OverlayTrigger
                                            placement="right-end"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipAuthor}
                                        >
                                            <FontAwesomeIcon
                                                className={"ml-2"}
                                                size={"sm"}
                                                icon={["fas", "info-circle"]}
                                            />
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Select
                                        id="authors"
                                        key={"authorz"}
                                        options={authors}
                                        onChange={selectAuthorChange}
                                        className={"text-left border-0"}
                                        onBlur={() => {
                                            authorsValidationColors("#ced4da");
                                        }}
                                        onFocus={() => {
                                            authorsValidationColors("#80bdff");
                                        }}
                                        placeholder={"Please Select an Author"}
                                    />
                                    <input type={"hidden"} id={"hidden_authors"} />
                                    <Form.Control.Feedback className={"text-left"} type="invalid">
                                        An author must be selected
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        )}
                        <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                            <Form.Group className={"my-2 col-12 col-md-10"}>
                                <Form.Label className={"required"}>
                                    <b>
                                        {props.match.params.id === undefined ? "Tags" : "Edit Tags"}
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipTag}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Select
                                    id="tags"
                                    className={"text-left basic-multi-select"}
                                    key={`reactSelect${blog.tags[0].label}`}
                                    onBlur={() => {
                                        tagsValidationColors("#ced4da");
                                    }}
                                    onFocus={() => {
                                        tagsValidationColors("#80bdff");
                                    }}
                                    defaultValue={props.match.params.id ? blog.tags : null}
                                    onChange={selectTagsChange}
                                    isMulti
                                    options={tags}
                                    placeholder={"Please Select a Tag"}
                                    classNamePrefix="select"
                                    required
                                />

                                <Form.Control.Feedback className={"text-left"} type="invalid">
                                    A tag must be selected
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                            <Col className={"my-2"} xs={12} md={10}>
                                <Form.Group>
                                    <Form.Label className={"required"}>
                                        <b>
                                            {props.match.params.id === undefined
                                                ? "Content"
                                                : "Edit Content"}
                                        </b>
                                        <OverlayTrigger
                                            placement="right-end"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipContent}
                                        >
                                            <FontAwesomeIcon
                                                className={"ml-2"}
                                                size={"sm"}
                                                icon={["fas", "info-circle"]}
                                            />
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        defaultValue={
                                            props.match.params.id === undefined ? "" : blog.content
                                        }
                                        rows={5}
                                        onInput={handleChange}
                                        name={"content"}
                                        className={"shadow-sm"}
                                        id={"message"}
                                        maxLength={10000}
                                        required
                                    />
                                    <Form.Text
                                        key={textLength}
                                        className={"font-italic small text-left text-dark"}
                                    >
                                        You have {textLength} characters left.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid" className={"text-left"}>
                                        Enter the content of your blog
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <footer
                            className={
                                " bg-dark text-white align-self-center my-round mt-auto"
                            }
                        >
                            <Row
                                className={
                                    props.match.params.id === undefined
                                        ? "mx-0 p-0 w-100 justify-content-center"
                                        : "mx-0 p-0 w-100 justify-content-between"
                                }
                            >
                                {" "}
                                {props.match.params.id === undefined ? (
                                    <div
                                        className={
                                            "mx-1 my-md-3 my-3 d-flex align-self-center col-xl-3  col-lg-4 col-md-5 col-sm-6 col-12"
                                        }
                                    >
                                        <Button
                                            type="submit"
                                            className="shadow-sm w-100"
                                            variant="success"
                                        >
                                            Create Blog
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <ModalConfirmation
                                            invalid={findInvalid}
                                            post_user={postTag}
                                            validate_form={isFormValid}
                                            tag_valid={selectValid}
                                            tag_obj={tagOption}
                                            form_element={formElement}
                                            blog_obj={blogForm}
                                            tag_func={postTag}
                                            mod_obj={modalText}
                                            location={props.location}
                                            match={props.match}
                                            history={props.history}
                                        />
                                    </>
                                )}{" "}
                            </Row>
                        </footer>
                    </Form>
                </Jumbotron>
                <AlertModal
                    open_mod={errShow}
                    close_func={handleClose}
                    show_func={handleShow}
                />
                <SuccessAlertModal
                    open_mod={sucShow}
                    heading={heading}
                    body={body}
                    close_func={handleCloseMod}
                    show_func={handleShowMod}
                />
            </>
        ) : (
            <>
                <Redirect to={"/"} />
            </>
        )
    ) : (
        <>
            <Redirect to={lastLink} />
        </>
    );
};
export default NewBlog;
