import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import baseNewPasswordForm from '@/components/atoms/baseNewPasswordForm.vue';
import { nextTick } from 'vue';

describe('baseNewPasswordForm', () => {
  const defaultProps = {
    password: '',
    confirmPassword: '',
    passwordInputType: 'password',
    confirmPasswordInputType: 'password',
    showPassword: false,
    showConfirmPassword: false,
    passwordHasLowercase: false,
    passwordHasUppercase: false,
    passwordHasNumeric: false,
    passwordHasSpecialCharacter: false,
    passwordIs8CharactersLong: false,
    passwordsMatch: true,
  }

  it('renders correctly', () => {
    const wrapper = mount(baseNewPasswordForm, { props: defaultProps })
    expect(wrapper.find('label[for="password"]').exists()).toBe(true)
    expect(wrapper.find('label[for="confirmPassword"]').exists()).toBe(true)
  })

  it('binds password and confirmPassword inputs', async () => {
    const wrapper = mount(baseNewPasswordForm, { props: defaultProps })

    const passwordInput = wrapper.find('input#password')
    await passwordInput.setValue('MyPass123!')
    expect(wrapper.emitted('update:password')).toBeTruthy()
    expect(wrapper.emitted('update:password')[0]).toEqual(['MyPass123!'])

    const confirmInput = wrapper.find('input#confirmPassword')
    await confirmInput.setValue('MyPass123!')
    expect(wrapper.emitted('update:confirmPassword')).toBeTruthy()
    expect(wrapper.emitted('update:confirmPassword')[0]).toEqual(['MyPass123!'])
  })

  it('emits toggleShowPassword and toggleShowConfirmPassword on eye icon click', async () => {
    const wrapper = mount(baseNewPasswordForm, {
      props: {
        ...defaultProps,
        showPassword: false,
        showConfirmPassword: true,
      }
    })

    let eyeIconPassword = wrapper.find('.password-eye .pi-eye-slash')
    await eyeIconPassword.trigger('click')
    expect(wrapper.emitted('toggleShowPassword')).toBeTruthy()

    await wrapper.setProps({ showPassword: true })
    await nextTick()
    eyeIconPassword = wrapper.find('.password-eye .pi-eye')
    await eyeIconPassword.trigger('click')
    expect(wrapper.emitted('toggleShowPassword')).toBeTruthy()

    let eyeIconConfirm = wrapper.find('.confirm-password-eye .pi-eye')
    await eyeIconConfirm.trigger('click')
    expect(wrapper.emitted('toggleShowConfirmPassword')).toBeTruthy()
    await wrapper.setProps({ showConfirmPassword: false })
    await nextTick()
    eyeIconConfirm = wrapper.find('.confirm-password-eye .pi-eye-slash')
    await eyeIconConfirm.trigger('click')
    expect(wrapper.emitted('toggleShowConfirmPassword')).toBeTruthy()
  })

  it('applies "valid" class based on password requirements', () => {
    const wrapper = mount(baseNewPasswordForm, {
      props: {
        ...defaultProps,
        passwordHasLowercase: true,
        passwordHasUppercase: true,
        passwordHasNumeric: true,
        passwordHasSpecialCharacter: false,
        passwordIs8CharactersLong: true,
      }
    })

    const listItems = wrapper.findAll('ul li')

    expect(listItems[0].classes()).toContain('valid')
    expect(listItems[1].classes()).toContain('valid')
    expect(listItems[2].classes()).toContain('valid')
    expect(listItems[3].classes()).not.toContain('valid')
    expect(listItems[4].classes()).toContain('valid')
  })

  it('shows error when passwords do not match', async () => {
    const wrapper = mount(baseNewPasswordForm, {
      props: {
        ...defaultProps,
        passwordsMatch: false,
      }
    })

    const confirmInput = wrapper.find('input#confirmPassword')
    await confirmInput.setValue('mismatch123')

    const errorMsg = wrapper.find('.new-password-form-error')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toContain('Passwords do not match.')
  })

  it('adds invalid class on confirmPassword input when mismatch', async () => {
    const wrapper = mount(baseNewPasswordForm, {
      props: {
        ...defaultProps,
        passwordsMatch: false,
      }
    })
    const passwordInput = wrapper.find('input#password')
    await passwordInput.setValue('MyPass123!')

    const confirmInput = wrapper.find('input#confirmPassword')
    await confirmInput.setValue('wrongPassword')

    expect(confirmInput.classes()).toContain('invalid')
  })
})