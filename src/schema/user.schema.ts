import {object, string, TypeOf} from 'zod'
export const createUserSchema =object({

    body:object({

        name:string({
            required_error:'Name is required'
        }),
        email:string({
            required_error:'Email is required'
        }).email('Not a valid email'),
        password:string({
            required_error:'Password is required'
        }).min(6, 'Password is to short - should be minimum of 6 characters'),
        passwordConfirmation:string({
            required_error:'Password confirmation  is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {

        message:'Password do not match',
        path:['password Confirmation'],
})
})


export type CreateUserInput = TypeOf<typeof  createUserSchema>