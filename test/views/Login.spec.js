
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import { nextTick } from 'vue'

// const mockPush = vi.fn()
// const mockLogIn = vi.fn()
// const mockSendResetPasswordEmail = vi.fn()

// vi.mock('vue-router', () => ({
//   useRouter: () => ({ push: mockPush })
// }))

// vi.mock('@/services/auth.service', () => ({
//   AuthService: {
//     logIn: mockLogIn,
//     sendPasswordResetEmail: mockSendResetPasswordEmail
//   }
// }))

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login)
    // mockPush.mockReset()
    // mockLogIn.mockReset()
    // mockSendResetPasswordEmail.mockReset()
  })

  it('renders login title', () => {
    expect(wrapper.find('.login-title').text()).toBe('Login')
  })

  it('disables login button when form is invalid', async () => {
    expect(wrapper.find('.login-form-submit').attributes('disabled')).toBeDefined()
  })

  it('enables login button when email and password are valid', async () => {
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#password').setValue('password123')
    await nextTick()
    expect(wrapper.find('.login-form-submit').attributes('disabled')).toBeUndefined()
  })

  it('shows password eye icons and toggles visibility', async () => {
    expect(wrapper.find('.pi-eye-slash').exists()).toBe(true)
    await wrapper.find('.pi-eye-slash').trigger('click')
    expect(wrapper.find('.pi-eye').exists()).toBe(true)
  })

  it.todo('logs in successfully and redirects to /home', async () => {
    mockLogIn.mockResolvedValueOnce({ user: {}, session: {}, error: null })
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(mockLogIn).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/home')
  })

  it.todo('shows login error on failure', async () => {
    mockLogIn.mockResolvedValueOnce({ error: new Error('Invalid credentials') })
    await wrapper.find('#email').setValue('bad@example.com')
    await wrapper.find('#password').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.find('.login-form-item-error').text()).toContain('Invalid email or password.')
  })

  it.todo('switches to forgot password mode and sends email', async () => {
    await wrapper.find('.login-footer-link').trigger('click')
    expect(wrapper.text()).toContain('Send Reset Password Email')

    await wrapper.find('#email').setValue('reset@example.com')
    mockSendResetPasswordEmail.mockResolvedValueOnce({ error: null })

    await wrapper.find('.login-form-submit').trigger('click')
    await nextTick()
    expect(mockSendResetPasswordEmail).toHaveBeenCalledWith('reset@example.com')
    expect(wrapper.text()).toContain('A reset password email has been sent')
  })
})
