import { mount } from '@vue/test-utils';
import BurgerMenu from '@/components/molecules/burgerMenu.vue';
import { vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import { nextTick } from 'vue';
import { AuthService } from '@/services/auth.service';

vi.mock('@/services/auth.service', () => ({
  AuthService: {
    logOut: vi.fn().mockResolvedValue({ error: null })
  }
}));

// Minimal router setup
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/home', name: 'Home', component: { template: '<div>Home Page</div>' } },
    { path: '/analytics', name: 'Analytics', component: { template: '<div>Analytics Page</div>' } },
    { path: '/profile', name: 'Profile', component: { template: '<div>Profile Page</div>' } },
  ]
});

describe('BurgerMenu.vue', () => {
  it('renders menu items when not loading', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });

    await nextTick();
    const links = wrapper.findAll('.burger-menu-items a');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].text()).toContain('Home');
  });

  it('shows loader when loading is true', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });

    // simulate loading
    wrapper.vm.isLoading = true;
    await nextTick();

    expect(wrapper.find('.loader').exists()).toBe(true);
    expect(wrapper.find('.burger-menu-items').exists()).toBe(false);
  });

    it('opens menu when Slide emits openMenu', async () => {
          const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });
    await wrapper.findComponent({ name: 'Slide' }).vm.$emit('openMenu')
      await nextTick()
      expect(wrapper.vm.isOpen).toBe(true)
    })
  
    it('closes menu when Slide emits closeMenu', async () => {
          const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });
    await wrapper.findComponent({ name: 'Slide' }).vm.$emit('closeMenu')
      await nextTick()
      expect(wrapper.vm.isOpen).toBe(false)
    })

  it('navigates to the correct route on click', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });
    const pushSpy = vi.spyOn(router, 'push');

    await router.isReady();
    const homeLink = wrapper.find('#home');
    await homeLink.trigger('click');
    await nextTick();

    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.isLoading).toBe(false);
    expect(pushSpy).toHaveBeenCalledWith('/home');
  });

  it('calls logout and redirects when logout is clicked', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });
    const pushSpy = vi.spyOn(router, 'push');

    const logoutLink = wrapper.find('#logout');
    await logoutLink.trigger('click');
    await nextTick();

    expect(wrapper.vm.isLoading).toBe(true);
    expect(wrapper.vm.isOpen).toBe(false);
    expect(pushSpy).toHaveBeenCalledWith('/');
  });

  it('logs error if logout fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    AuthService.logOut.mockResolvedValueOnce({ error: 'Logout failed' });

    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    });

    const logoutLink = wrapper.find('#logout');
    await logoutLink.trigger('click');
    await nextTick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Logout error:', 'Logout failed');
    consoleErrorSpy.mockRestore();
  });
});
