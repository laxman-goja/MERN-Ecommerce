import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { FormInput, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate, useParams } from "react-router-dom"
import Switch from "react-switch"


export const Edit = () =>{

    const [form, setFrom] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [staff, setStaff] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)

        http.get(`cms/staffs/${params.id}`)
            .then(({data}) => setStaff(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
        }, [])
    
    useEffect(() => {
        if(Object.keys(staff).length){
            setFrom({
                name: staff.name,
                phone: staff.phone,
                address: staff.address,
                status: staff.status
            })
        }
        },[staff])


    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/staffs/${params.id}`, form)
            .then(() => navigate('/staffs'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }



    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col lg={6} className="mx-auto">
                    <h1>Edit Staff</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mx-auto">
                        { loadingPage ? <loading /> : <Form onSubmit={handelSubmit}>
                            <FormInput title="name" label= "Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.name} required />
                            </FormInput>
                            <FormInput title="email" label= "Email">
                            <Form.Control type="text" defaultValue={staff.email} readOnly plaintext />
                            </FormInput>
                            <FormInput title="phone" label= "Phone">
                            <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.phone} required />
                            </FormInput>
                            <FormInput title="address" label= "Address">
                            <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.address} required />
                            </FormInput>
                            <FormInput title="status" label="Status">
                                <br />
                                <Switch checked = {form.status} onChange={() =>{
                                    setFrom({
                                        ...form,
                                        status:!form.status
                                    })
                                }}/>
                            </FormInput>
                            <div className="mb-3 ">
                                <SubmitBtn  loading={loading}/>
                            </div>
                        </Form>}
                    </Col>
                </Row>
            </Col>
        </Row>
        
    </Container>
}