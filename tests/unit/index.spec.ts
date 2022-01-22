import {shallowMount} from '@vue/test-utils'
import Index from '@/Index.vue'
import InlineLoader from '@/components/InlineLoader.vue'
import axios from "axios";

const URL = 'https://randomuser.me/api/?inc=gender,name,nat,email,location,phone,picture,id';

jest.spyOn(axios, 'get')
    .mockImplementation(() => Promise
        .resolve({
            info: {},
            results: []
        }))


describe("Index.vue", () => {
    it("shows loader, calls randomuser api, hides loader, users are 25", async () => {

        const wrapper = shallowMount(Index);

        expect(wrapper
            .findComponent(InlineLoader)
            .isVisible())
            .toBe(true); // show loader when data is loading

        expect(axios.get)
            .toHaveBeenCalledWith(URL,
                {params: {results: 25}});  // check is api call was made

        setTimeout(() => {
            expect(wrapper
                .findComponent(InlineLoader)
                .isVisible())
                .toBe(false); // show loader when data is loading

            expect(wrapper.vm.users.length)
                .toBe(25); // confirm that we have 25 users listed on load

            expect(Object
                .values(wrapper.vm.selectedUser).length)
                .toBeGreaterThan(0); // Should have selected a user profile to show
        }, 0)
    });
});
