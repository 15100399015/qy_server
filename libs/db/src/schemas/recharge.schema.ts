import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 充值记录
@Schema({
  timestamps: {
    createdAt: 'recharge_time',
  },
})
export class Recharge extends Document {
  @ApiProperty({ description: '用户id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  user_id: number;
  @ApiProperty({ description: '支付金额' })
  @Prop({
    type: Number,
    required: true,
  })
  recharge_price: number;
  @ApiProperty({ description: '充值点数' })
  @Prop({
    type: Number,
    required: true,
  })
  recharge_id: number;
  @ApiProperty({ description: '支付类型' })
  @Prop({
    type: Number,
    required: true,
  })
  recharge_pay_type: number;
  @ApiProperty({ description: '支付设备' })
  @Prop({
    type: String,
    required: true,
  })
  recharge_model: string;
  @ApiProperty({ description: '支付状态' })
  @Prop({
    type: Boolean,
    required: true,
  })
  recharge_status: boolean;
  @ApiProperty({ description: '订单号' })
  @Prop({
    type: Number,
    required: true,
  })
  recharge_code: number;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  recharge_remarks: string;
}

export const RechargeSchema = SchemaFactory.createForClass(Recharge);
export const RechargeDocName = 'qy' + '_' + Recharge.name.toLowerCase();
