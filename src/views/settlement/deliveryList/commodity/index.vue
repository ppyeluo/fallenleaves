<template>
    <div class="commodity_container">
        <h3>商家：xxxx</h3>
        <div class="info">
            <div class="image"><img src="https://img.21xianhua.com/upload/2022/03/01/167d326a153e32cd06e5902fbd29016e" width="100%"></div>
            <div class="word">
                <div class="desc"><span class="name">誓言</span><span class="flowerLanguage">青春是段跌跌撞撞的旅行， 拥有着后知后觉的美丽。</span></div>
                <div class="material">粉红雪山玫瑰66朵，鲜花直径不小于55cm，花泥制作； 8寸心形水果蛋糕</div>
            </div>
            <div class="price">
                <div class="unit">&yen;387.00</div>
                <div class="weight">1.90kg</div>
            </div>
            <div class="count">x1</div>
        </div>
    </div>
</template>

<script setup lang='ts'>

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