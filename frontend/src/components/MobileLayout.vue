<template>
  <div class="flex h-full flex-col">
    <div class="h-full overflow-auto" id="scrollContainer">
      <slot />
    </div>
  </div>
</template>
<script>
import { scrollTo } from '@/utils/scrollContainer'
import LucideHome from '~icons/lucide/home'
import LucideUsers2 from '~icons/lucide/users-2'
import LucideSearch from '~icons/lucide/search'
import LucideInbox from '~icons/lucide/inbox'
import LucideLayoutGrid from '~icons/lucide/layout-grid'
import LucideListTodo from '~icons/lucide/list-todo'
import LucideNewspaper from '~icons/lucide/newspaper'

export default {
  name: 'MobileLayout',
  computed: {
    tabs() {
      return [
        {
          name: 'Profile',
          icon: LucideNewspaper,
          route: { name: 'Profile' },
          isActive: this.$route.name === 'Profile',
        },
        {
          name: 'MyTasks',
          icon: LucideListTodo,
          route: { name: 'MyTasks' },
          isActive: /MyTasks|Task/g.test(this.$route.name),
        },
        {
          name: 'Teams',
          icon: LucideLayoutGrid,
          route: { name: 'Teams' },
          isActive: [
            'Teams',
            'TeamOverview',
            'ProjectOverview',
            'ProjectDiscussions',
            'ProjectDiscussion',
            'ProjectDiscussionNew',
            'ProjectTasks',
            'ProjectTaskDetail',
          ].includes(this.$route.name),
        },
        {
          name: 'People',
          icon: LucideUsers2,
          route: { name: 'People' },
          isActive: /People|PersonProfile/g.test(this.$route.name),
          condition: () => this.$user().isNotGuest,
        },
        {
          name: 'Grades',
          icon: LucideSearch,
          route: { name: 'Grades' },
          isActive: this.$route.name === 'Grades',
          condition: () => this.$user().isNotGuest,
        },
        {
          name: 'Notifications',
          icon: LucideInbox,
          route: { name: 'Notifications' },
          isActive: this.$route.name === 'Notifications',
        },
      ].filter((tab) => (tab.condition ? tab.condition() : true))
    },
  },
  methods: {
    onTabClick(tab) {
      if (tab.isActive) {
        scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      this.$router.push(tab.route)
    },
  },
}
</script>
