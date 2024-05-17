<template>
    <div class="commodity_container">
        <h3>商家：xxxx</h3>
        <div class="info" v-for="i in commodityList">
            <div class="image"><img :src="i.picture" width="100%" height="100%"></div>
            <div class="word">
                <div class="desc"><span class="name">{{ i.name }}</span><span class="flowerLanguage">{{ i.flowerLanguage }}</span></div>
                <div class="material">{{ i.materials }}</div>
            </div>
            <div class="price">
                <div class="unit">&yen;{{ i.price }}</div>
                <div class="weight">直径{{ i.size }}cm</div>
            </div>
            <div class="count">x{{ i.count }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { Ref, inject } from 'vue'
import { Settlement } from '@/api/commodity/type'

const commodityList = inject<Ref<Settlement[]>>('commodityList')
</script>

<style scoped lang='scss'>
.commodity_container{
    background-color: #f3fbfe;
    padding: 1em;

    h3{
        font-size: 13px;
        padding-bottom: 0.6em;
    }

    .info{
        display: flex;
        font-size: 13px;

        .image{
            width: 8em;
            aspect-ratio: 1 / 1;
            margin-right: 1em;
        }
        .word{
            display: flex;
            flex-direction: column;
            width: 20em;
            
            .desc{
                padding-top: 0.6em;

                .name{
                    padding-right: .6em;
                    font-weight: 800;
                }
                .flowerLanguage{
                    color: rgb(42, 39, 39);
                }
            }
            .material{
                padding-top: 0.6em;
            }
        }
        .price{
            padding-top: .6em;
            padding-left: 2em;

            .unit{
                color: red;
            }
            .weight{
                margin-top: .4em;
            }
        }
        .count{
            padding-top: .6em;
            padding-left: 2em;
        }
    }
}
</style>