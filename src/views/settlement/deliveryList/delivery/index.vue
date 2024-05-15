<template>
    <div class="dilivery_container">
        <h3>配送方式</h3>
        <div class="way">
            <div class="way_item active">顺丰快递</div>
            <div class="way_item" style="display: flex;align-items: center;"><el-icon><Bicycle /></el-icon><span style="padding-left: 0.2em;">闪送</span></div>
            <div class="way_item">上门自提</div>
        </div>
        <div class="expected">
            预计 4月26日[周五] 09:00-11:00 送达
        </div>
        <div class="weight">
            <div class="w_key">总重量：</div>
            <div class="w_value">3.360kg</div>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.dilivery_container{
    background-color: #f7f7f7;
    padding: 1em;

    h3{
        font-size: 13px;
    }

    .way{
        display: flex;
        flex-wrap: wrap;

        .way_item{
            width: 11em;
            padding: 0.3em 3em;
            border: 1px solid #d4d4d4;
            font-size: 13px;
            text-align: center;
            margin-right: 2em;
            margin-top: 1em;

            &.active{
                border: 1px solid red;
            }
        }
    }
    .expected{
        font-size: 13px;
        padding: .6em 0;
        color: #97bcbc;
    }
    .weight{
        display: flex;
        font-size: 13px;

        .w_key{
            font-weight: 900;
        }
        .w_value{
            color: #d4d4d4
        }
    }
}
</style>