<template>
    <div class="flex h-[70px] bg-[#212121] sticky top-0 items-center">
        <router-link to="/login">
            <button class="h-[35px] w-[35px] ml-5">
                <img src="/images/icons/audioflow-logo.png" class=" h-[35px] w-[35px]">
            </button>
        </router-link>

        <router-link to="/profile" class="ml-64">
            <button class="h-[35px] w-[35px] ml-auto mr-5">
                <img src="/images/icons/guest-pic.png" class=" h-[35px] w-[35px]">
            </button>    
        </router-link>
    </div>
</template>
